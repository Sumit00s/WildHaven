"use server"

import { revalidatePath } from "next/cache";
import { signIn, signOut,auth} from "./auth"
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
    const session = await auth();
    if(!session) throw new Error("You must be logged In");

    const nationalID = formData.get('nationalID');
    const [nationality,countryFlag] = formData.get('nationality').split('%');

    if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid national ID");

    const updateData = {nationality,countryFlag,nationalID};
    
    const { data, errors } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestID);

    if (errors) {
        console.error(error);
        throw new Error("Guest could not be updated");
    }

    revalidatePath('/account/profile')
} 

export async function createBooking(bookingData,formData) {
    const session = await auth();
    if(!session) throw new Error("You must be logged In");

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestID,
        numGuests:Number(formData.get('numGuests')),
        observations:formData.get('observations').slice(0,1000),
        extrasPrice : 0,
        totalPrice: bookingData.cabinPrice,
        isPaid:false,
        hasBreakfast:false,
        status:"unconfirmed"
    }

    const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])

    if (error) {
        throw new Error("Booking could not be created");
    }

    revalidatePath(`/cabins/${bookingData.cabinId}`)
    redirect('/cabins/thankyou')
}

export async function updateBooking(formData) {

    // 1) Authntication
    const session = await auth();
    if(!session) throw new Error("You must be logged In");

    // 2) Authorization
    const bookingId = Number(formData.get('bookingId'));
    const guesstBookings = await getBookings(session.user.guestID);
    const guestBookingIds = guesstBookings.map((booking)=>booking.id)
    if(!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to update this booking")

    // 3) Updating Data
    const updateData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0,1000),
    }

    // 4) Mutation
    const { data, error } = await supabase
        .from("bookings")
        .update(updateData)
        .eq("id", bookingId)
        .select()
        .single();
    
      if (error) {
        console.error(error);
        throw new Error("Bookings could not be updated");
      }

    // 5)Revalidation
      revalidatePath(`/account/reservations/edit/${bookingId}`)
      revalidatePath('/account/reservations')

    // 6) Redirection
      redirect('/account/reservations')
}

export async function deleteReservation(bookingId) {
    const session = await auth();
    if(!session) throw new Error("You must be logged In");

    const guesstBookings = await getBookings(session.user.guestID);
    const guestBookingIds = guesstBookings.map((booking)=>booking.id)

    if(!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking")

    const { data, error } = await supabase.from("bookings").delete().eq("id", bookingId);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }

    revalidatePath('/account/reservations')
}

export async function signInAction() {
    await signIn("google",{redirectTo:"/account"});
}

export async function signOutAction() {
    await signOut({redirectTo:"/"})
}

