import { AdminService } from "./../../_services/admin.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AdminService: AdminService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.fectchTeamId();
  }

  configEditor = {
    removeButtons:
      "Print,Preview,NewPage,Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,ImageButton,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,FontSize,Image",
    toolbarGroups: [
      { name: "document", groups: ["mode", "document", "doctools"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"],
      },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      { name: "styles", groups: ["styles"] },
      { name: "paragraph", groups: ["list", "indent", "blocks"] },
      "/",
      { name: "clipboard", groups: ["clipboard", "undo"] },
      { name: "paragraph", groups: ["align", "bidi", "paragraph"] },
      { name: "forms", groups: ["forms"] },
      { name: "links", groups: ["links"] },
      { name: "colors", groups: ["colors"] },
      { name: "insert", groups: ["insert"] },
      "/",
      { name: "tools", groups: ["tools"] },
      { name: "others", groups: ["others"] },
      { name: "about", groups: ["about"] },
    ],
    removePlugins: "exportpdf",
  };

  triggerFileUpload() {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    fileInput.click();
}


  public teamObj: any = {
    name: "",
    image: "",
    designation: "",
    description: "",
    has_details:""
  };

  public coverIcon: any = null;
  public isteamSave: boolean = false;


   //  Function for Fetching Project Id
   is_edit = false;
   fectchTeamId() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        let id = params["id"];
        this.getTeamdetails(id); 
        this.is_edit = true;
      }else {
        this.is_edit = false;
      }
    });
  }


  getTeamdetails(id: string) {
    this.AdminService.teamDetail({id: id}).subscribe((response: any) => {
      if (response.success == 1) {
        this.teamObj = response.team;
       
      }else {
        this.router.navigate(["/list"]);        
      }
    });
  }

  //  Cover Icon Preiew Function
  onCoverIconChange(event) {
    var file = event.srcElement.files[0];
    if (typeof file.type != "undefined") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverIcon = e.target.result;
      };
      this.teamObj.image = file;
      reader.readAsDataURL(file);
    }
  }

  removeImage(){
    this.teamObj.image = "";
    this.teamObj.remove_image = "delete";
  }

  addteam(form) {
    let formdata = new FormData();
    formdata.append("from_app", "true");


    for (let key in this.teamObj) {
      if (
        this.teamObj[key] !== undefined &&
        this.teamObj[key] !== null
      ) {
        formdata.append(key, this.teamObj[key]);
      }
    }

    if (this.isteamSave == false) {
      this.isteamSave = true;
      if (form.valid) {
        this.AdminService.addTeam(formdata).subscribe((response: any) => {
          if (response.success === 1) {
            this.teamObj = {};
            this.isteamSave = false;
            this.router.navigate(["/list"]);
            this.toastr.success(response.message);
          } else {
            this.isteamSave = false;
            this.toastr.error(response.message);
          }
        });
      } else {
        this.isteamSave = false;
      }
    }
  }
}
