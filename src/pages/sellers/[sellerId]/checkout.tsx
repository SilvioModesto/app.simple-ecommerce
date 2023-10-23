
import { Checkout } from "@/components/Users/Sellers/Checkout";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const { sellerId } = router.query
  return (
    <Checkout sellerId={ sellerId as string}/>
  )
}
