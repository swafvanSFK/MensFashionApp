import { useEffect } from "react";
import { useGetAllCategories } from "../store/productStore";

const FilterByCategory = () => {
    const { categories, setAllCategories } = useGetAllCategories();

    useEffect(() => {
        setAllCategories();
    }, []);

    console.log("categories", categories);

    return (
        <div className='h-auto flex shadow-xl flex-col gap-5 p-8 bg-white dark:bg-gray-800'>
            <div>
                <h1 className='text-2xl text-center font-medium'>Filter By Categories</h1>
            </div>
            <div>
                <ul className='flex flex-col gap-2'>
                    {
                        categories?.map((item) => (
                            <li className='cursor-pointer hover:text-white hover:bg-[#269FB7] transition-all capitalize pl-1 py-1' key={item._id}>
                                {item.category}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default FilterByCategory;
