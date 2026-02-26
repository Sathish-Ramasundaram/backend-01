import { BrowserRouter, Routes, Route, Link } from "react-router-dom";  
import { lazy, Suspense } from "react";

const HasuraHome = lazy(() => import("./HasuraHome"));
const RestAPI = lazy(() => import("./RestAPI"));
const GraphQL = lazy(() => import("./GraphQL"));
const GraphQLSubscription = lazy(() => import("./GraphQLSubscription"));
const AccessControl = lazy(() => import("./AccessControl"));
const RemoteSchema = lazy(() => import("./remote_schema/RemoteSchema"));    
const RemoteSchemaTwo = lazy(() => import("./remote_schema/RemoteSchemaTwo"));  
const AuthenAutho = lazy(() => import("./Authen_Autho/AuthenAutho"));  


function HasuraRouter() {
    return (
         <div>
            <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HasuraHome />} />
                    <Route path="/rest" element={<RestAPI />} />
                    <Route path="/graphql" element={<GraphQL />} />
                    <Route path="/graphql-subscription" element={<GraphQLSubscription />} />
                    <Route path="/access-control" element={<AccessControl />} />
                    <Route path="/remote-schema" element={<RemoteSchema />} />  
                    <Route path="/remote-schema-two" element={<RemoteSchemaTwo />} />  
                    <Route path="/authen-autho" element={<AuthenAutho />} />    
                </Routes>
            </Suspense>
            </BrowserRouter>    
        </div>
    );
}

export default HasuraRouter;