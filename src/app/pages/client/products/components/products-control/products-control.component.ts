import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-products-control',
  templateUrl: './products-control.component.html',
  styleUrls: ['./products-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsControlComponent implements OnInit {

  controllers = [
    {
      title: "Manage Products",
      text: "Click here to manage the products you sell in your stores.",
      route: "/products/manage",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__bank.svg"
    },
    {
      title: "Product Categories",
      text: "Click here to manage your product category eg. Electronics.",
      route: "/products/categories",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__file.svg"
    },
    {
      title: "Check Stock",
      text: "Analyse what you have in stock in all your shops",
      route: "/products/stocks",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
    },
    {
      title: "New Product",
      text: "Create a single product or multiple products at once.",
      route: "",
      img: "https://assetslogos.s3.eu-west-1.amazonaws.com/frontendassets/icons/icon__blue__pos__terminal.svg"
    },
  ]

  ngOnInit() {}

}
