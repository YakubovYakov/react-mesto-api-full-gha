import React from "react";
import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
		<Route>
			{() => 
			props.isloggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
			}
		</Route>
	)
};

