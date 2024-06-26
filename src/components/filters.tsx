'use client';
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useCategoryData, useSubCategory } from '@/lib/fetch/query';
import { MerData } from '@/lib/fetch/interface/interfaceApi';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store/store';
import { updateCategory, updateOffset } from '@/lib/store/slice/favoriteSlice';
import { MLANUM } from './tableMer';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Skeleton } from './ui/skeleton';


const Fitlers = () => {
    const dispatch: AppDispatch = useDispatch();
    const [subCategoryData2, setSubCategoryData2] = useState<MerData>();
    const [CategoryData2, setCategoryData2] = useState<MerData>();
    const [categoryIdFinally, setCategoryId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const { categoryData, isLoading } = useCategoryData(MLANUM);
    const { subCategoryData } = useSubCategory(MLANUM, categoryIdFinally);

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    useEffect(() => {
        if (selectedCategory) {
            fetchCategoryItems(selectedCategory);
        }
    }, [selectedCategory]);

    const handleRoute = (categoryId: string) => {
        dispatch(updateCategory(categoryId));
        dispatch(updateOffset(0));
    };

    useEffect(() => {
        setSubCategoryData2(subCategoryData);

    }, [subCategoryData]);

    // Función asincrónica para obtener datos de subcategorías
    const fetchCategoryItems = async (categoryId: string) => {
        try {
            setCategoryId(categoryId);
        } catch (error) {
            console.error('Error fetching category items:', error);
        }
    };

    // Efecto para actualizar datos de subcategorías cuando están disponibles
    useEffect(() => {
        if (categoryData) {
            setCategoryData2(categoryData);
        }
    }, [categoryData]);

    return (
        <div>
            {isLoading ?
                <div className=' hidden  lg:flex flex-col gap-5'>
                    <Skeleton className="h-16 w-[260px]" />
                    <Skeleton className="h-16 w-[260px]" />
                    <Skeleton className="h-16 w-[260px]" />
                </div>
                :
                <div className='hidden lg:flex px-3'>
                    <Accordion type="single" collapsible className="w-full">
                        {CategoryData2 && CategoryData2.available_filters.find(filter => filter.id === 'category')?.values.map((x, index) =>
                            <AccordionItem value={x.id} key={index}>
                                <AccordionTrigger className='text-wrap text-left' onClick={() => handleCategorySelect(x.id)} >{x.name}</AccordionTrigger>
                                <AccordionContent>
                                    <ul>
                                        {!isLoading && subCategoryData ? (
                                            subCategoryData.available_filters &&
                                                subCategoryData.available_filters.find(filter => filter.id === 'category')?.values?.length ? (
                                                subCategoryData.available_filters.find(filter => filter.id === 'category')!.values.map((result) => (
                                                    <li className='' key={result.id}>
                                                        <Button variant={'ghost'} onClick={() => handleRoute(result.id)}>{result.name}</Button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className='' key={x.id}>
                                                    <Button variant={'ghost'} onClick={() => handleRoute(x.id)}>{x.name}</Button>
                                                </li>
                                            )
                                        ) : null}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>)
                        }
                    </Accordion>
                </div>
            }


            <div className=' flex lg:hidden pb-4'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Categorias</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <Accordion type="single" collapsible className="w-full">
                            {CategoryData2 && CategoryData2.available_filters.find(filter => filter.id === 'category')?.values.map((x, index) =>
                                <AccordionItem value={x.id} key={index}>
                                    <AccordionTrigger className='text-wrap text-left' onClick={() => handleCategorySelect(x.id)} >{x.name}</AccordionTrigger>
                                    <AccordionContent>
                                    <ul>
                                        {!isLoading && subCategoryData ? (
                                            subCategoryData.available_filters &&
                                                subCategoryData.available_filters.find(filter => filter.id === 'category')?.values?.length ? (
                                                subCategoryData.available_filters.find(filter => filter.id === 'category')!.values.map((result) => (
                                                    <li className='' key={result.id}>
                                                        <Button variant={'ghost'} onClick={() => handleRoute(result.id)}> {result.name}</Button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className='' key={x.id}>
                                                    <Button variant={'ghost'} onClick={() => handleRoute(x.id)}>{x.name}</Button>
                                                </li>
                                            )
                                        ) : null}
                                    </ul>
                                    </AccordionContent>
                                </AccordionItem>)
                            }
                        </Accordion>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default Fitlers;