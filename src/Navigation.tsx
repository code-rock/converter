import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Сonverter from "./pages/Сonverter.page";
import Home from "./pages/Home.page";
import { Menu } from "./ui/Menu";

export default function Navigation() {
    return (
        <Router>
            <Menu>
                <Link to="/">Главная</Link>
                <Link to="/converter">Конвертер</Link>
            </Menu>

            <Switch>
                <Route path="/converter">
                    <Сonverter />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
