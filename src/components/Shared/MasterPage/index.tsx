import { useUserStore } from "@/stores";
import { useStore } from "zustand";
import { AdminMasterPage } from "./AdminMasterPage";
import { ClientMasterPage } from "./ClientMasterPage";
import { useRouter } from "next/router";

export function MasterPage(props: any) {
  const router = useRouter();
  const userStore = useStore(useUserStore);

  if (userStore.authenticated) {
    if ((router.pathname || '').indexOf('/admins') !== 0) {
      router.replace('/admins');
    }

    return <AdminMasterPage>{props.children}</AdminMasterPage>;
  }

  return <ClientMasterPage>{props.children}</ClientMasterPage>;
}
