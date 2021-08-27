import React, { useState } from 'react';
import { useEffect } from 'react';
import { CATEGORY_API_URL } from '../constants';
import { useHistory } from 'react-router';

const Menu = (props) => {
    const [categoryList, updateCategory] = useState([]);
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

    const filterByCategory = (event) => {
        const categoryId = event.target.dataset.id;
        props.onChange(categoryId);
        updateHideMenu(true);
        console.log('CategoryId', categoryId);
    };

    useEffect(() => {
        console.log('Use Effect running Menu');
        async function fetchCategories() {
            const categoryResponse = await fetch(CATEGORY_API_URL);

            const categoryResponseJson = await categoryResponse.json();
            console.log('Category Response', categoryResponseJson);
            updateCategory(categoryResponseJson);
        }
        fetchCategories();
    }, []);

    return <div className="books-menu">
        <div className="menu" onClick={handleMenuClick}>Categories</div>
        <ul className="menu-items" hidden={hideMenu}>
            {
                categoryList.map(category => {
                    console.log(category);
                    return <li className="menu-item" onClick={filterByCategory} data-id={category.name}>{category.name}</li>
                })
            }
        </ul>
    </div >
};

export default Menu;