import React, { useState, useEffect } from "react";
import axios from 'axios';
import ClientNavbar from "../../../../components/navbar-visitor/clientnav"

const Messages = () => {


    return(
        <div className="body_1">
            <ClientNavbar />
            <h1>Messages Page</h1>
        </div>
    )
}

export default Messages