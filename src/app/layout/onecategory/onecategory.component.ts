import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../services/CategoriesService";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../services/UserService";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-onecategory',
  templateUrl: './onecategory.component.html',
  styleUrls: ['./onecategory.component.scss']
})
export class OnecategoryComponent implements OnInit, AfterViewInit {

  @Input() category: any;
  submitting = false;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              public modal: NgbActiveModal,
              public userService: UserService,
              private categoryServices: CategoriesService) {
    this.formGroup = this.fb.group({
      id: [null],
      name: ['Hair care', Validators.compose([Validators.required])],
      slug: ['Hair products', Validators.compose([Validators.required])],
      shop_id: [this.userService.connectedUSer?.shop_id, Validators.compose([Validators.required])],
      photo: ['https://img.freepik.com/free-photo/barber-rsquo-s-hairstyling-women-rsquo-s-salon-jobs-career-campaign_53876-127192.jpg?w=2000&t=st=1668781296~exp=1668781896~hmac=d5eeb6d3c7f501f0f8e11b42eb065ca60e7a5fa97d33a750d6ab7c0eee2332f6'],
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if(this.category){
      this.formGroup.patchValue({
        ...this.category
      });
    }
  }

  async submit(){
    try{
      this.submitting = true;
      const res = await this.categoryServices.addCategory(this.formGroup.value).toPromise();
      console.log('res submit', res);
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Category added successfully!',
      });
      this.modal.close();
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

  async submitEditCategory(){
    try{
      this.submitting = true;
      const res = await this.categoryServices.updateCategory(this.formGroup.value).toPromise();
      console.log('res submit', res);
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Category updated successfully!',
      });
      this.modal.close();
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
}
