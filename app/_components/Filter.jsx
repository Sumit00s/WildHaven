"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Filter(){

    const searchParmas = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = searchParmas.get('capacity') ?? 'all';

    function handleFilter(filter){
        const params = new URLSearchParams(searchParmas);
        params.set("capacity",filter);
        router.replace(`${pathname}?${params.toString()}`,{scroll:false})
    }

    return (
        <div className=" border border-primary-800 flex">
            <button className={`px-5 py-2 hover:bg-primary-700 ${activeFilter == 'all' ? ' bg-accent-500' : null}`} onClick={()=>handleFilter('all')}>All Cabins</button>
            <button className={`px-5 py-2 hover:bg-primary-700 ${activeFilter == 'small' ? ' bg-accent-500' : null}`} onClick={()=>handleFilter('small')}>1&mdash;3 guests</button>
            <button className={`px-5 py-2 hover:bg-primary-700 ${activeFilter == 'medium' ? ' bg-accent-500' : null}`} onClick={()=>handleFilter('medium')}>4&mdash;7 guests</button>
            <button className={`px-5 py-2 hover:bg-primary-700 ${activeFilter == 'large' ? ' bg-accent-500' : null}`} onClick={()=>handleFilter('large')}>8&mdash;N guests</button>
        </div>
    )
}