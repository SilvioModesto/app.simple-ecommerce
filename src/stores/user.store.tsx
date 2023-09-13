import { ISignin, ISignup } from "@/interfaces";
import { UserService } from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useUserStoreProps {
  authenticated: boolean;
  data: any;
  signup: (data: ISignup) => Promise<void>;
  signin: (data: ISignin) => Promise<void>;
  signout: () => void;
}

export const useUserStore = create(
  persist<useUserStoreProps>(
    (set, get) => ({
      authenticated: false,
      data: {},
      signup: (data: ISignup) => UserService.signup(data),

      signin: (data: ISignin) => {
        return new Promise((resolve, reject) => {
          UserService.signin(data)
            .then((d) => {
              set({
                ...get(),
                data: d,
                authenticated: true,
              });

              resolve();
            })
            .catch(reject);
        });
      },

      signout: () => {
        set({
          ...get(),
          authenticated: false,
          data: {},
        });
      },
    }),
    { name: "user-store" }
  )
);
