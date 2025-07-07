import React, { useState, useEffect } from "react";
import { FiSearch, FiArrowUp, FiArrowDown, FiRefreshCw } from "react-icons/fi";
import { FormControl, InputLabel, Select, MenuItem, Button, Tooltip } from "@mui/material";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const Filter = ({ categories }) => {
    

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSearchTerm = searchParams.get("keyword") || "";
        const currentSortOrder = searchParams.get("sortby") || "asc";

        setCategory(currentCategory);
        setSearchTerm(currentSearchTerm);
        setSortOrder(currentSortOrder);
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        }, 700);

        return () => {
            clearTimeout(handler);
        };
    }, [searchParams, searchTerm, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = prevOrder === "asc" ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        });
    };

    const handleClearFilters = () => {
        navigate({ pathname: window.location.pathname });
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* SEARCH BAR */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                />
                <FiSearch className="absolute left-3 text-slate-800" size={20} />
            </div>

            {/* CATEGORY SELECTION */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small"
                >
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-[120px] text-slate-800 border-slate-700"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.filter(item => item.categoryName !== "all").map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT BUTTON & CLEAR FILTER */}
                <Tooltip title={`Sorted by price: ${sortOrder}`}>
                    <Button
                        variant="contained"
                        onClick={toggleSortOrder}
                        color="primary"
                        className="flex items-center gap-2 h-10 !text-base !font-semibold !px-6"
                        style={{ textTransform: "none" }}
                    >
                        Sort By
                        {sortOrder === "asc" ? (
                            <FiArrowUp size={20} />
                        ) : (
                            <FiArrowDown size={20} />
                        )}
                    </Button>
                </Tooltip>
                <Button
                    variant="contained"
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 !bg-rose-900 !text-white !text-base !font-semibold !px-6"
                    style={{ textTransform: "none" }}
                >
                    <FiRefreshCw className="font-semibold" size={16} />
                    <span className="font-semibold">Clear Filter</span>
                </Button>
            </div>
        </div>
    );
};
export default Filter;