import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/CategoriesService";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OnecategoryComponent} from "../onecategory/onecategory.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  loadingData = false;
  categories = []
  constructor(private categoriesService: CategoriesService, private modalService: NgbModal) {
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

  addNewCategory(category = null) {
    const modalRef = this.modalService.open(OnecategoryComponent, {size: 'lg'});
    modalRef.result.then((res) => {
      this.getCategories();
    });
    if(category){
      modalRef.componentInstance.category = category;
    }
  }

  async deleteCategory(category: any) {
    try{
      this.loadingData = true;
      const res: any = await this.categoriesService.deleteCategory({id: category.id}).toPromise();
      this.getCategories();
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Category deleted successfully!',
      });
    }catch (e){
      console.log('error', e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }finally {
      this.loadingData = false;
    }
  }

  askDeleteCategory(category: any) {
    Swal.fire({
      title: 'Do you want to delete this category?',
      showCancelButton: true,
      confirmButtonText: 'Yes delete',
      cancelButtonText: `cancel`,
      icon: 'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.value) {
        this.deleteCategory(category);
      }
    })
  }
}
