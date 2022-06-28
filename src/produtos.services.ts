/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Produto } from './produto.model';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto)
    private ProdutoModel: typeof Produto
  ){}
  ;

  async obterTodos(): Promise<Produto[]> {
    return this.ProdutoModel.findAll();
  }

  async obterUm(id: number): Promise<Produto> {
    return this.ProdutoModel.findByPk(id);
  }

  async criar(produto: Produto) {
    this.ProdutoModel.create(produto);
  }
  
async alterar(produto: Produto): Promise<[number, Produto[]]> {
    return this.ProdutoModel.update(produto, {
      returning: true,
      where: { id: produto.id } });
}

  async apagar(id: number){
    const produto: Produto = await this.obterUm(id);
    produto.destroy();
  }
}

