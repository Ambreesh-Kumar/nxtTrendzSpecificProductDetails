// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {itemDetails: {}}

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products.map(eachItem => ({
          id: eachItem.id,
          imageUrl: eachItem.image_url,
        })),
        title: data.title,
        totalReviews: data.total_reviews,
      }
      this.setState({itemDetails: updatedData})
    }
  }

  renderItemDetails = () => {
    const {itemDetails} = this.state
    const {
      title,
      availability,
      brand,
      description,
      id,
      imageUrl,
      price,
      rating,
      totalReviews,
      similarProducts,
    } = itemDetails
    return (
      <div>
        <div className="item-detail-main-container">
          <div>
            <img src={itemDetails.imageUrl} alt="" className="itemImage" />
          </div>
          <div className="item-description-container">
            <h1 className="title">{title}</h1>
            <p className="price">Rs {price}/-</p>
            <div className="review-rating-container">
              <div className="item-rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-image"
                />
              </div>
              <p className="reviews">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="availability">
              Available: <span className="description">{availability}</span>
            </p>
            <p className="availability">
              Brand: <span className="description">{brand}</span>
            </p>
            <hr className="horizontal-line" />
            <div className="button-container">
              <button className="plus-minus-button">
                <BsPlusSquare />
              </button>
              <p className="count">1</p>
              <button className="plus-minus-button">
                <BsDashSquare />
              </button>
            </div>
            <button className="add-cart-button">ADD TO CART</button>
          </div>
        </div>
        <div>
          <h1 className="similar-product-heading">Similar Products</h1>
          <div>
            <SimilarProductItem similarProducts={similarProducts} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {itemDetails} = this.state
    console.log(itemDetails)
    return (
      <div>
        <Header />
        <div>{this.renderItemDetails()}</div>
      </div>
    )
  }
}
export default ProductItemDetails
