
import { SocialPlatforms } from "@database/enum/user";
import { CartItem } from "@database/model/cart-item.model";
// import { Order } from "@database/model/order.model";


export interface LoggedInUser {
  token: string;
}
export interface DecodedToken {
  id: string,
  email:string,
  role:string

}

export interface OrderPlaced {
  orderId:string,
  userId:string,
  cartItems:CartItem[]
}
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneCode: string;
  contact: number;
  isAccountSetup: boolean;
  isMemberSociety: boolean;
  keyfobSerialId: string;
}

export interface RegisterUser {
  id?:string,
  name: string;
  password:string,
  email:string,
}

export interface ConfirmOrder {
 userId:string,
 bill:string,
 deliveryGuyId:string
}

