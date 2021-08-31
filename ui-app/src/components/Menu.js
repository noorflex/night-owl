import React, { useState } from 'react';
import { useEffect } from 'react';
import { CATEGORY_API_URL } from '../constants';
import { useHistory } from 'react-router';

const Menu = (props) => {
    const [categoryList, updateCategory] = useState([]);
    const [hideMenu, updateHideMenu] = useState(true);

    const history = useHistory();
    const handleMenuClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        var shouldHide = (hideMenu === true) ? false : true;
        updateHideMenu(shouldHide);
    };

    const filterByCategory = (event) => {
        const categoryId = event.target.dataset.id;
        props.onChange(categoryId);
        updateHideMenu(true);
    };

    useEffect(() => {
        async function fetchCategories() {
            const categoryResponse = await fetch(CATEGORY_API_URL);

            const categoryResponseJson = await categoryResponse.json();
            const categoryAll = { name: 'All', description: '' };
            categoryResponseJson.push(categoryResponseJson);
            updateCategory(categoryResponseJson);
        }
        fetchCategories();
    }, []);

    return <div className="books-menu">
        <div className="menu" onClick={handleMenuClick}>Categories</div>
        <ul className="menu-items" hidden={hideMenu}>
            {
                categoryList.map(category => {
                    return <li className="menu-item" onClick={filterByCategory} data-id={category.name}>{category.name}</li>
                })
            }
        </ul>
    </div >
};

export default Menu;