import React, { useState, useEffect } from "react";
import { CATEGORY_API_URL } from "../../constants";
import { useHistory } from "react-router";
import { Dropdown } from "react-bootstrap";

const CategoryList = (props) => {
    const [categoryList, updateCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(props.selected);
    const [hideMenu, updateHideMenu] = useState(true);
    console.log('Menu received props:' + props.items);

    const history = useHistory();
    const handleMenuClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        var shouldHide = (hideMenu === true) ? false : true;
        console.log('clicked menu: hideMenu=' + shouldHide);
        updateHideMenu(shouldHide);
    };

    const setCategorySelected = (eventKey, event) => {
        const categoryId = eventKey; //change this to actual category id later
        setSelectedCategory(categoryId);
        props.onCategorySeleceted(categoryId);
    };

    useEffect(() => {
        console.log('Use Effect running Menu');
        async function fetchCategories() {
            const categoryResponse = await fetch(CATEGORY_API_URL);

            let categoryResponseJson = await categoryResponse.json();
            console.log('Category Response', categoryResponseJson);
            if (!(props.showAll == "false")) {
                const categoryAll = { name: 'All', description: '', categoryId: '0' };
                categoryResponseJson.push(categoryAll);
            }
            updateCategory(categoryResponseJson);
        }

        fetchCategories();
    }, []);
    return <Dropdown onSelect={setCategorySelected}>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
            {selectedCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {categoryList.map(category => {
                return <Dropdown.Item eventKey={category.name}>{category.name}</Dropdown.Item>
            })}
        </Dropdown.Menu>
    </Dropdown >
}

export default CategoryList;