import React from "react";
import PageHeader from "./common/page-header";
import Joi from "joi-browser";
import Form from "./common/form";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class EditAsset extends Form {
  state = {
    data: {
      assetName: "",
      assetDescription: "",
      assetAddress: "",
      assetPhone: "",
      assetImage: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    assetName: Joi.string()
      .min(2)
      .max(255)
      .required(),
    assetDescription: Joi.string()
      .min(2)
      .max(1024)
      .required(),
    assetAddress: Joi.string()
      .min(2)
      .max(400)
      .required(),
    assetPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    assetImage: Joi.string()
      .min(11)
      .max(1024)
      .uri()
      .allow("")
  };

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await cardService.getCard(cardId);
    this.setState({ data: this.mapData(data) });

  }

  mapData(card) {
    return {
      assetName: card.assetName,
      assetDescription: card.assetDescription,
      assetAddress: card.assetAddress,
      assetPhone: card.assetPhone,
      assetImage: card.assetImage,
      _id: card._id
    }
  }
  doSubmit = async () => {
    const { data } = this.state;
    await cardService.editCard(data);
    toast.info('Post is updated');
    this.props.history.replace('/my-assets');

  };

  render() {
    return (
      <div className="container">
        <PageHeader>Edit your post</PageHeader>
        <div className="row">
          <div className="col-12">
            <p>Go ahead , edit your post...</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST" >
              {this.renderInput("assetName", "Asset Name",)}
              {this.renderInput("assetDescription", "Asset Description")}
              {this.renderInput("assetAddress", "Asset Address")}
              {this.renderInput("assetPhone", "Asset Phone")}
              {this.renderInput("assetImage", "asset Image")}
              {this.renderButton("Update Post")}
              <Link className="btn btn-secondary ms-2" to="/my-assets">Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditAsset;