import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins cannot be loaded");
  }

  return data;
}

export async function createEditCabin(newData, id) {
  const isEditSession = Boolean(id);
  let hasImagePath = Boolean(typeof newData.image === "string");

  const imageName = `${Math.random()}-${newData.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newData.Image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. CREATING CABIN
  let query = supabase.from("cabins");
  const newImage = hasImagePath ? newData.image : imagePath;

  // A. CREATE CABIN
  if (!isEditSession) query = query.insert([{ ...newData, image: newImage }]);

  // B. EDIT CABIN
  if (isEditSession) {
    query = query.update({ ...newData, image: newImage }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(
      `Cabin could not be ${isEditSession ? "edited" : "created"}`
    );
  }

  // 2. UPLOADING IMAGE
  if (hasImagePath) return data;

  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newData.image);

  // 3. DELETING THE NEW CABIN IF UPLOAD ERROR
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(uploadError);
    throw new Error(
      "Cabin image image could not be uploaded and the cabin was not created "
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin cannot be deleted");
  }

  return data;
}
