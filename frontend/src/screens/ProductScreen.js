import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   Button,
   Card,
   Col,
   FormControl,
   Image,
   ListGroup,
   ListGroupItem,
   Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { listProductDetails } from "../actions/productActions";
import { Alert } from "react-bootstrap";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

const Loader = () => {
   return (
      <Spinner
         animation="border"
         role="status"
         style={{ width: "100px", height: "100px", margin: "auto", display: "block" }}
      >
         <span class="sr-only">Loading...</span>
      </Spinner>
   );
};

const ProductScreen = ({ history, match }) => {
   //  const dispatch = useDispatch();

   //  const productDetails = useSelector((state) => state.productDetails);
   //  const { loading, error, product } = productDetails;
   const [product, setproduct] = useState([]);
   const [loading, setloading] = useState(false);
   const [qty, setqty] = useState(1);

   useEffect(() => {
      // dispatch(listProductDetails(match.params.id));
      setloading(true);
      axios.get(`/api/products/${match.params.id}`).then(({data}) => {
         setproduct(data);
         setloading(false);
         console.log(product);
      });
   }, [match]);

   const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`);
   };

   return (
      <>
         <Link className="btn btn-dark my-3" to="/">
            Go Back
         </Link>
         {loading ? (
            <Loader />
         ) : (
            <Row>
               <Col md={6}>
                  <Image src={product.image} fluid alt={product.name} />
               </Col>
               <Col md={3}>
                  <ListGroup variant="flush">
                     <ListGroupItem>
                        <h3>{product.name}</h3>
                     </ListGroupItem>
                     <ListGroupItem>
                        <Rating
                           value={product.rating}
                           text={`${product.numReviews} Reviews`}
                           color="gold"
                        />
                     </ListGroupItem>
                     <ListGroupItem>Price: ${product.price}</ListGroupItem>
                     <ListGroupItem>Description: ${product.description}</ListGroupItem>
                  </ListGroup>
               </Col>
               <Col md={3}>
                  <Card>
                     <ListGroup variant="flush">
                        <ListGroupItem>
                           <Row>
                              <Col>Price:</Col>
                              <Col>
                                 <strong>${product.price}</strong>
                              </Col>
                           </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                           <Row>
                              <Col>Status:</Col>
                              <Col>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                           </Row>
                        </ListGroupItem>
                        {product.countInStock > 0 && (
                           <ListGroupItem>
                              <Row>
                                 <Col>Qty</Col>
                                 <Col>
                                    <FormControl
                                       as="select"
                                       value={qty}
                                       onChange={(e) => setqty(e.target.value)}
                                    >
                                       {[...Array(product.countInStock).keys()].map((x) => (
                                          <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                          </option>
                                       ))}
                                    </FormControl>
                                 </Col>
                              </Row>
                           </ListGroupItem>
                        )}
                        <ListGroupItem>
                           <Button
                              onClick={addToCartHandler}
                              className="btn-block"
                              type="button"
                              disabled={product.countInStock === 0}
                           >
                              Add To Cart
                           </Button>
                        </ListGroupItem>
                     </ListGroup>
                  </Card>
               </Col>
            </Row>
         )}
      </>
   );
};

export default ProductScreen;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//    Button,
//    Card,
//    Col,
//    FormControl,
//    Image,
//    ListGroup,
//    ListGroupItem,
//    Row,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Rating from "../components/Rating";
// import axios from "axios";
// import { Spinner } from "react-bootstrap";
// import { listProductDetails } from "../actions/productActions";
// import { Alert } from "react-bootstrap";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

// const ProductScreen = ({ history, match }) => {
//    const [qty, setQty] = useState(1);
//    const dispatch = useDispatch();
//    const productDetails = useSelector((state) => state.productDetails);
//    const { loading, error, product } = productDetails;

//    useEffect(() => {
//          dispatch(listProductDetails(match.params.id));

//    }, [dispatch, match]);

//    const addToCartHandler = () => {
//       history.push(`/cart/${match.params.id}?qty=${qty}`);
//    };

//    return (
//       <>
//          <Link className="btn btn-dark my-3" to="/">
//             Go Back
//          </Link>
//          {loading ? (
//             <Loader />
//          ) : (
//             <Row>
//                <Col md={6}>
//                   <Image src={product.image} fluid alt={product.name} />
//                </Col>
//                <Col md={3}>
//                   <ListGroup variant="flush">
//                      <ListGroupItem>
//                         <h3>{product.name}</h3>
//                      </ListGroupItem>
//                      <ListGroupItem>
//                         <Rating
//                            value={product.rating}
//                            text={`${product.numReviews} Reviews`}
//                            color="gold"
//                         />
//                      </ListGroupItem>
//                      <ListGroupItem>Price: ${product.price}</ListGroupItem>
//                      <ListGroupItem>Description: ${product.description}</ListGroupItem>
//                   </ListGroup>
//                </Col>
//                <Col md={3}>
//                   <Card>
//                      <ListGroup variant="flush">
//                         <ListGroupItem>
//                            <Row>
//                               <Col>Price:</Col>
//                               <Col>
//                                  <strong>${product.price}</strong>
//                               </Col>
//                            </Row>
//                         </ListGroupItem>

//                         <ListGroupItem>
//                            <Row>
//                               <Col>Status:</Col>
//                               <Col>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
//                            </Row>
//                         </ListGroupItem>
//                         {product.countInStock > 0 && (
//                            <ListGroupItem>
//                               <Row>
//                                  <Col>Qty</Col>
//                                  <Col>
//                                     <FormControl
//                                        as="select"
//                                        value={qty}
//                                        onChange={(e) => setQty(e.target.value)}
//                                     >
//                                        {[...Array(product.countInStock).keys()].map((x) => (
//                                           <option key={x + 1} value={x + 1}>
//                                              {x + 1}
//                                           </option>
//                                        ))}
//                                     </FormControl>
//                                  </Col>
//                               </Row>
//                            </ListGroupItem>
//                         )}
//                         <ListGroupItem>
//                            <Button
//                               onClick={addToCartHandler}
//                               className="btn-block"
//                               type="button"
//                               disabled={product.countInStock === 0}
//                            >
//                               Add To Cart
//                            </Button>
//                         </ListGroupItem>
//                      </ListGroup>
//                   </Card>
//                </Col>
//             </Row>
//          )}
//       </>
//    );
// };

// export default ProductScreen;
