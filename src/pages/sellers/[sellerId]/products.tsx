import { SellerProducts } from "@/components/Users/Sellers/Products";
import { useRouter } from "next/router";

export default function SellerProductsPage() {
  const router = useRouter();
  const { sellerId } = router.query;

  return (
    <SellerProducts sellerId={sellerId as string} />
  );
}