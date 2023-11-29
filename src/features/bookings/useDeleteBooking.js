import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const clientQuery = useQueryClient();

  const { mutate: deleteOneBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking succesfully deleted");
      clientQuery.invalidateQueries(["bookings"]);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteOneBooking };
}
