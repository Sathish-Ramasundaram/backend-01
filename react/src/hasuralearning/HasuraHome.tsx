import { Link } from "react-router-dom";

function HasuraHome() {
    return (
        <div>
            <Link className="text-blue-400 underline hover:text-blue-700" to="/rest">Rest API</Link>
            <br />
            <Link className="text-blue-400 underline hover:text-blue-700" to="/graphql">GraphQL</Link>
            <br />
            <Link className="text-blue-400 underline hover:text-blue-700" to="/graphql-subscription">GraphQL Subscription</Link>
            <br />
            <Link className="text-blue-400 underline hover:text-blue-700" to="/access-control">Access Control</Link>
            <br />
            <Link className="text-blue-400 underline hover:text-blue-700" to="/remote-schema">Remote Schema</Link>  
            <br />
            <Link className="text-blue-400 underline hover:text-blue-700" to="/remote-schema-two">Remote Schema Two</Link>      
            <br />
            <Link className="text-blue-400 underline hover:text-blue-700" to="/authen-autho">Authen Autho</Link>    
        </div>  
    );
}

export default HasuraHome;  
