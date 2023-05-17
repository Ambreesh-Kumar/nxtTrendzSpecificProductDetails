// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

class SimilarProductItem extends Component {
  constructor(props) {
    super(props)
    this.state = {similarProductList: props.similarProducts, itemDetails: {}}
  }

  componentDidMount() {
    const {similarProductList} = this.state
    similarProductList.map(eachItem =>
      this.getSimilarProductDetail(eachItem.id),
    )
  }

  getSimilarProductDetail = async currentId => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${currentId}`
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

  render() {
    const {itemDetails} = this.state
    return (
      <ul>
        <ProductCard productData={itemDetails} />
      </ul>
    )
  }
}

export default SimilarProductItem
