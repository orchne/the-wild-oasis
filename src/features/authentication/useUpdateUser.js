import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const clientQuery = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("User account successfully updated");

      clientQuery.setQueryData(["user"], user);

      //   clientQuery.invalidateQueries({
      //     queryKey: ["user"],
      //   });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}
