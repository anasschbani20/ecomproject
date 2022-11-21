import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../services/UserService";
import {CategoriesService} from "../../services/CategoriesService";
import Swal from "sweetalert2";
import {ProductsService} from "../../services/ProductsService";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.scss']
})
export class OneproductComponent implements OnInit, AfterViewInit {

  product: any;
  submitting = false;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              // public modal: NgbActiveModal,
              public userService: UserService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private productsService: ProductsService) {
    this.formGroup = this.fb.group({
      id: [],
      category_id: [],
      name: [],
      description: [],
      ref: [],
      price: [],
      availability: [],
      stock: [],
      tva: [],
      photo: []
    });
    this.activatedRoute.params.subscribe((params: any) => {
      if(params.idCategory){
        this.formGroup.patchValue({
          category_id: params.idCategory
        });
      }
      if(params.idProduct){
        this.getProduct(Number(params.idProduct));
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  initFormBuilder(){
    this.formGroup.patchValue({
      ...this.product,
      availability: Number(this.product.availability)
    });
  }

  getProduct(id: number){
    this.productsService.getOneProduct({id}).toPromise().then((res: any) => {
      this.product = res?.result?.data;
      this.initFormBuilder();
    }).catch(e => {
      console.log('error', e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Product not found!',
      })
      this.location.back();
    });
  }

  async submit(){
    try{
      this.submitting = true;
      const res = await this.productsService.addProduct(this.formGroup.value).toPromise();
      console.log('res submit', res);
      Swal.fire({
        icon: 'success',
        title: 'Perfect...',
        text: 'Product added successfully!',
      });
      this.goBack();
      // this.modal.close();
    }catch (e){
      console.log('error', e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }finally {
      this.submitting = false;
    }
  }

  async submitEditproduct(){
    try{
      this.submitting = true;
      const res = await this.productsService.updateProduct(this.formGroup.value).toPromise();
      console.log('res submit', res);
      Swal.fire({
        icon: 'success',
        title: 'Perfect...',
        text: 'product updated successfully!',
      });
      // this.modal.close();
    }catch (e){
      console.log('error', e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }finally {
      this.submitting = false;
    }
  }

  goBack() {
    this.location.back();
  }
}
