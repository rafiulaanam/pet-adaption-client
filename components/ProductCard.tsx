"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}  


const ProductCard = ({ product, updateSignedInUser }: ProductCardProps ) => {
  const { user } = useUser();
const router = useRouter();
const handleChangeRoute = async (id:string) => {
  try {
    if (!user) {
      router.push("sign-in");
    } else {
      router.push(`/products/${id}`);
    }
  } catch (err) {
    console.log("[Route]", err);
  }
};
  return (
    <div
      // href={`/products/${product._id}`}
      onClick={()=>handleChangeRoute(product._id)}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
       
        <button  onClick={()=>handleChangeRoute(product._id)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
