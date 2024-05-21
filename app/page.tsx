import Card from "@/components/card";
import { createClient } from "@/supabase/client";
// import { supabase } from "@/supabase/client";

// The data is going always to be fresh all the time
// export const revalidate = 0;

// The data is going to be fetched every hour
export const revalidate = 3600;

export default async function Home() {
  const supabase = createClient();

  const { data: topProducts, error: topError } = await supabase
    .from("easysell-products")
    .select()
    .eq("boost", true);

  const { data: products, error } = await supabase
    .from("easysell-products")
    .select("*");

  if (!products || !topProducts) return <p>Not Found</p>;

  return (
    <main className="min-h-screen  max-w-[100rem] mx-auto">
      <div className="px-12 pt-12 pb-20">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
          <div className="pt-12">
            <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
            <p className="text-xl">You can pay to boost your products here.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
            {topProducts.map((p) => {
              return (
                <Card
                  key={p.id}
                  imageUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/STORAGE/${p.imageUrl}`}
                  id={p.id}
                  name={p.name}
                  description={p.description}
                  price={p.price}
                ></Card>
              );
            })}
          </div>
        </div>

        <h2 className="text-4xl mt-20 mb-16">ALL PRODUCTS</h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => (
              <Card
                key={p.id}
                {...p}
                imageUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/STORAGE/${p.imageUrl}`}
              ></Card>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-800">All our products are gone...</p>
        )}
      </div>
    </main>
  );
}
