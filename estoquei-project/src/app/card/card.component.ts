import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(private produtoService: ProdutoService) { }

  produtos: any;
  list_produtos: Produto [] = [];

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.produtos = this.produtoService.getProducts()
  }

}
