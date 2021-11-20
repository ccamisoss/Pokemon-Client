import React from "react";
import { Link } from "react-router-dom";

export function LandingPage(){
    return(
        <div>
            <Link to="/home">
            <button>Comenzar</button>
            </Link>
        </div>
    )
}