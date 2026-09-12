import {
  ArrowUpRight,
  ChefHat,
  Home,
  Boxes,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Kitchenware",
    description: "Smart essentials for your kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85",
    icon: ChefHat,
    link: "/kitchenware",
  },
  {
    id: 2,
    title: "Household",
    description: "Everyday essentials for your home",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    icon: Home,
    link: "/household",
  },
  {
    id: 3,
    title: "Storage",
    description: "Organize every corner beautifully",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85",
    icon: Boxes,
    link: "/storage",
  },
  {
    id: 4,
    title: "Cleaning",
    description: "Simple solutions for a cleaner home",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
    icon: Sparkles,
    link: "/cleaning",
  },
];

function CategorySection() {
  return (
    <section className="bg-[#F8F1E7] px-5 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-21">

      <div className="mx-auto max-w-[1500px]">

        {/* =========================
            SECTION HEADING
        ========================= */}
        <div className="mb-10 text-center md:mb-12 lg:mb-14">

          <p className="mb-3 text-sm md:text-[21px] font-medium uppercase tracking-[0.28em] text-[#9A542C]">
            Explore FLOVR
          </p>

          <h2 className="font-serif text-4xl leading-tight tracking-wide text-[#171717] md:text-5xl">
            Shop By Category
          </h2>

          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-[#6d6259] md:text-base">
            Thoughtfully selected essentials designed to bring
            simplicity and organization to every space.
          </p>

        </div>


        {/* =========================
            CATEGORY GRID
        ========================= */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4">

          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <a
                key={category.id}
                href={category.link}
                className="group relative block overflow-hidden bg-[#E9D8C3]"
              >

                {/* IMAGE */}
                <div className="aspect-[0.78] overflow-hidden sm:aspect-[0.82] md:aspect-[0.9] lg:aspect-[0.82]">

                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                </div>


                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />


                {/* CONTENT */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5 md:p-6">

                  {/* ICON */}
                  <div className="mb-3 flex h-8 w-8 items-center justify-center border border-white/50 bg-white/10 backdrop-blur-sm sm:h-9 sm:w-9">

                    <Icon
                      size={16}
                      strokeWidth={1.4}
                    />

                  </div>


                  {/* TITLE */}
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl">
                    {category.title}
                  </h3>


                  {/* DESCRIPTION */}
                  <p className="mt-1 hidden max-w-[220px] text-xs leading-5 text-white/80 sm:block">
                    {category.description}
                  </p>


                  {/* EXPLORE */}
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] sm:mt-4 sm:text-xs">

                    <span>
                      Explore
                    </span>

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />

                  </div>

                </div>

              </a>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default CategorySection;