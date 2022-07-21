import React, {useCallback, useState} from 'react';
import {Icon, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import './index.css'
import {useNavigate} from "react-router";
import {BasketModel} from "../BasketModel";

export function NavBar() {
    const [page, setPage] = useState(window.location.pathname);
    const navigation = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onLinkClicked = useCallback((newPath: string) => {
        setPage(newPath);
    }, []);

    return (
        <Menu fixed={"top"} className="navbar-container">
            <Menu.Item style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                       onClick={() => navigation('/')}>
                <img src={'https://housiystrg.blob.core.windows.net/generalmedia/housiy-logo.png'}
                     style={{width: 144, height: 36}} alt={"logo"}/>
            </Menu.Item>
            <Menu.Item position="right">
                <Menu.Item onClick={() => setIsModalOpen(true)}>
                    <Icon name="shopping cart"/>
                </Menu.Item>
                <Menu.Item className={page === "/" ? "active-menu-item" : ""}>
                    <Link onClick={() => onLinkClicked("/")} to="/">Home</Link>
                </Menu.Item>
                <Menu.Item className={page === "/about" ? "active-menu-item" : ""}>
                    <Link onClick={() => onLinkClicked("/favourites")} to="/favourites">Favourites</Link>
                </Menu.Item>
            </Menu.Item>
            {
                isModalOpen ? (<BasketModel onClose={() => setIsModalOpen(false)}/>) : null
            }
        </Menu>
    );
}
