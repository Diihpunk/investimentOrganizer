import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalEditComponent } from './modal-edit/modal-edit.component'
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import {MatCardModule} from '@angular/material/card';
import { InvestimentMainComponent } from './investiment/investiment-main.component';
import { AcaoComponent } from './cadastro/acao/acao.component';
import { FundosComponent } from './cadastro/fundos/fundos.component';
import { TesouroComponent } from './cadastro/tesouro/tesouro.component';
import { CadastroSelecaoComponent } from './cadastro/cadastro-selecao/cadastro-selecao.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MainComponent } from './home/main.component';
import { LoginComponent } from './login/login.component';
import { CadastroUserComponent } from './cadastro/usuario/cadastro-user.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RecuperaSenhaComponent } from './recuperar-senha/recupera-senha.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CanvasModalComponent } from './modal-canvas/canvas-modal.component';
import { ModalPremiumComponent } from './modal-premium/modal-premium.component'

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    InvestimentMainComponent,
    ModalEditComponent,
    AcaoComponent,
    FundosComponent,
    TesouroComponent,
    CadastroSelecaoComponent,
    MainComponent,
    LoginComponent,
    CadastroUserComponent,
    RecuperaSenhaComponent,
    CanvasModalComponent,
    ModalPremiumComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    AngularFireAuthModule,
    BrowserModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    NgbModule,
    AppRoutingModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatGridListModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
