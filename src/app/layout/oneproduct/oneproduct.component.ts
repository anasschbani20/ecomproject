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
  photoBase64: any;

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
      availability: [1],
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
      console.log('submitting', this.formGroup.value);
      const fd = new FormData();
      Object.keys(this.formGroup.value).forEach((key: any) => {
        if(this.formGroup.value[key] != null){
          fd.append(key, this.formGroup.value[key]);
        }
      });
      const res = await this.productsService.addProduct(fd).toPromise();
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
      const fd = new FormData();
      Object.keys(this.formGroup.value).forEach((key: any) => {
        if(this.formGroup.value[key] != null){
          fd.append(key, this.formGroup.value[key]);
        }
      });
      const res = await this.productsService.updateProduct(fd).toPromise();
      console.log('res submit', res);
      Swal.fire({
        icon: 'success',
        title: 'Perfect...',
        text: 'Product updated successfully!',
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


  async filechanged(event: any) {
    console.log('filechanged',  event.target.files[0]);
    this.formGroup.patchValue({
      photo: event.target.files[0]
    });
    this.photoBase64 = await this.fileToBase64(event.target.files[0]);
  }

  async fileToBase64 (file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (e) => reject(e)
    });
  }
}
