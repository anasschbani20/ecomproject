import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/CategoriesService";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  loadingData = false;
  categories = []
  constructor(private categoriesService: CategoriesService) {
    this.getCategories();
  }

  ngOnInit(): void {
  }

  async getCategories(){
    try{
      this.loadingData = true;
      const res: any = await this.categoriesService.getCategories().toPromise();
      console.log('getCategories', res);
      this.categories = res.result?.data;
    }catch (e){
      console.log('error', e);
    }finally {
      this.loadingData = false;
    }
  }
}
