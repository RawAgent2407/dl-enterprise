/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @next/next/no-img-element */
import ContactSection from "../components/ContactSection";
import StatsSection from "../components/StatsSection";
import { getCategories } from "@/lib/queries/category";
import PageNotFound from "../components/PageNotFound";
import CategoryCard from "./component/CategoryCard";

const RED_STATIC_CARD = {
  isStatic: true,
  id: "static-red-card",
  title: "Accessories",
  slug: "#",
  image: {
    url: null,
  },
};

export default async function ProductCategoriesGrid() {
  const categories = await getCategories();
  if (!categories || categories.length === 0) {
    return <PageNotFound />;
  }
  const rows = splitCards(categories);
  return (
    <>
      <section className='px-0 py-0 bg-gray-50'>
        <div className='w-full '>
          <div className='px-4 py-4 sm:px-6 lg:px-12 xl:px-20 flex items-center gap-2 text-base'>
            <span className='text-gray-500 font-medium'>Products</span>
            <span className='text-gray-400 font-medium text-xl'>›</span>
            <span className='text-black font-medium'>Categories</span>
          </div>
        </div>
        <div className='w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 space-y-6'>
          {/* FIRST 6 ITEMS - 2 Columns */}

          {rows.map((row, rowIndex) => {
            const isThree = row.length === 3;

            return (
              <div
                key={rowIndex}
                className={`
              grid gap-6 grid-cols-1 ${isThree ? "md:grid-cols-3" : "md:grid-cols-2"} gap-6
            `}
              >
                {row.map((item, index) => {
                  const aspect =
                    isThree
                      ? "aspect-[490/375]"
                      : "aspect-[490/375] md:aspect-[748/387]";

                  return (
                    <CategoryCard
                      key={item.id || index}
                      category={item}
                      aspect={aspect}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
      <StatsSection />
      <ContactSection />
    </>
  );
};

function splitCards(cards: any[]) {
  if (!cards?.length) return [];

  const rows = [];
  const total = cards.length;

  // If even → last row should be 3 cards
  if (total % 2 === 0 && total >= 3) {
    const normalRowsCount = total - 3;

    for (let i = 0; i < normalRowsCount; i += 2) {
      rows.push(cards.slice(i, i + 2));
    }

    rows.push(cards.slice(total - 3));
  }

  // If odd → last row 2 cards + red static
  else {
    const normalRowsCount = total - 2;

    for (let i = 0; i < normalRowsCount; i += 2) {
      rows.push(cards.slice(i, i + 2));
    }

    const lastTwo = cards.slice(total - 2);
    rows.push([...lastTwo, RED_STATIC_CARD]);
  }

  return rows;
}
