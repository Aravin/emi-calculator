import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Platform } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settingsForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  currencies = [{ symbol: '$', name: 'US Dollar', code: 'USD', symbol_native: '$' }, { symbol: 'CA$', name: 'Canadian Dollar', code: 'CAD', symbol_native: '$' }, { symbol: '€', name: 'Euro', code: 'EUR', symbol_native: '€' }, { symbol: 'AED', name: 'United Arab Emirates Dirham', code: 'AED', symbol_native: 'د.إ.‏' }, { symbol: 'Af', name: 'Afghan Afghani', code: 'AFN', symbol_native: '؋' }, { symbol: 'ALL', name: 'Albanian Lek', code: 'ALL', symbol_native: 'Lek' }, { symbol: 'AMD', name: 'Armenian Dram', code: 'AMD', symbol_native: 'դր.' }, { symbol: 'AR$', name: 'Argentine Peso', code: 'ARS', symbol_native: '$' }, { symbol: 'AU$', name: 'Australian Dollar', code: 'AUD', symbol_native: '$' }, { symbol: 'man.', name: 'Azerbaijani Manat', code: 'AZN', symbol_native: 'ман.' }, { symbol: 'KM', name: 'Bosnia-Herzegovina Convertible Mark', code: 'BAM', symbol_native: 'KM' }, { symbol: 'Tk', name: 'Bangladeshi Taka', code: 'BDT', symbol_native: '৳' }, { symbol: 'BGN', name: 'Bulgarian Lev', code: 'BGN', symbol_native: 'лв.' }, { symbol: 'BD', name: 'Bahraini Dinar', code: 'BHD', symbol_native: 'د.ب.‏' }, { symbol: 'FBu', name: 'Burundian Franc', code: 'BIF', symbol_native: 'FBu' }, { symbol: 'BN$', name: 'Brunei Dollar', code: 'BND', symbol_native: '$' }, { symbol: 'Bs', name: 'Bolivian Boliviano', code: 'BOB', symbol_native: 'Bs' }, { symbol: 'R$', name: 'Brazilian Real', code: 'BRL', symbol_native: 'R$' }, { symbol: 'BWP', name: 'Botswanan Pula', code: 'BWP', symbol_native: 'P' }, { symbol: 'Br', name: 'Belarusian Ruble', code: 'BYN', symbol_native: 'руб.' }, { symbol: 'BZ$', name: 'Belize Dollar', code: 'BZD', symbol_native: '$' }, { symbol: 'CDF', name: 'Congolese Franc', code: 'CDF', symbol_native: 'FrCD' }, { symbol: 'CHF', name: 'Swiss Franc', code: 'CHF', symbol_native: 'CHF' }, { symbol: 'CL$', name: 'Chilean Peso', code: 'CLP', symbol_native: '$' }, { symbol: 'CN¥', name: 'Chinese Yuan', code: 'CNY', symbol_native: 'CN¥' }, { symbol: 'CO$', name: 'Colombian Peso', code: 'COP', symbol_native: '$' }, { symbol: '₡', name: 'Costa Rican Colón', code: 'CRC', symbol_native: '₡' }, { symbol: 'CV$', name: 'Cape Verdean Escudo', code: 'CVE', symbol_native: 'CV$' }, { symbol: 'Kč', name: 'Czech Republic Koruna', code: 'CZK', symbol_native: 'Kč' }, { symbol: 'Fdj', name: 'Djiboutian Franc', code: 'DJF', symbol_native: 'Fdj' }, { symbol: 'Dkr', name: 'Danish Krone', code: 'DKK', symbol_native: 'kr' }, { symbol: 'RD$', name: 'Dominican Peso', code: 'DOP', symbol_native: 'RD$' }, { symbol: 'DA', name: 'Algerian Dinar', code: 'DZD', symbol_native: 'د.ج.‏' }, { symbol: 'Ekr', name: 'Estonian Kroon', code: 'EEK', symbol_native: 'kr' }, { symbol: 'EGP', name: 'Egyptian Pound', code: 'EGP', symbol_native: 'ج.م.‏' }, { symbol: 'Nfk', name: 'Eritrean Nakfa', code: 'ERN', symbol_native: 'Nfk' }, { symbol: 'Br', name: 'Ethiopian Birr', code: 'ETB', symbol_native: 'Br' }, { symbol: '£', name: 'British Pound Sterling', code: 'GBP', symbol_native: '£' }, { symbol: 'GEL', name: 'Georgian Lari', code: 'GEL', symbol_native: 'GEL' }, { symbol: 'GH₵', name: 'Ghanaian Cedi', code: 'GHS', symbol_native: 'GH₵' }, { symbol: 'FG', name: 'Guinean Franc', code: 'GNF', symbol_native: 'FG' }, { symbol: 'GTQ', name: 'Guatemalan Quetzal', code: 'GTQ', symbol_native: 'Q' }, { symbol: 'HK$', name: 'Hong Kong Dollar', code: 'HKD', symbol_native: '$' }, { symbol: 'HNL', name: 'Honduran Lempira', code: 'HNL', symbol_native: 'L' }, { symbol: 'kn', name: 'Croatian Kuna', code: 'HRK', symbol_native: 'kn' }, { symbol: 'Ft', name: 'Hungarian Forint', code: 'HUF', symbol_native: 'Ft' }, { symbol: 'Rp', name: 'Indonesian Rupiah', code: 'IDR', symbol_native: 'Rp' }, { symbol: '₪', name: 'Israeli New Sheqel', code: 'ILS', symbol_native: '₪' }, { symbol: 'Rs', name: 'Indian Rupee', code: 'INR', symbol_native: '₹' }, { symbol: 'IQD', name: 'Iraqi Dinar', code: 'IQD', symbol_native: 'د.ع.‏' }, { symbol: 'IRR', name: 'Iranian Rial', code: 'IRR', symbol_native: '﷼' }, { symbol: 'Ikr', name: 'Icelandic Króna', code: 'ISK', symbol_native: 'kr' }, { symbol: 'J$', name: 'Jamaican Dollar', code: 'JMD', symbol_native: '$' }, { symbol: 'JD', name: 'Jordanian Dinar', code: 'JOD', symbol_native: 'د.أ.‏' }, { symbol: '¥', name: 'Japanese Yen', code: 'JPY', symbol_native: '￥' }, { symbol: 'Ksh', name: 'Kenyan Shilling', code: 'KES', symbol_native: 'Ksh' }, { symbol: 'KHR', name: 'Cambodian Riel', code: 'KHR', symbol_native: '៛' }, { symbol: 'CF', name: 'Comorian Franc', code: 'KMF', symbol_native: 'FC' }, { symbol: '₩', name: 'South Korean Won', code: 'KRW', symbol_native: '₩' }, { symbol: 'KD', name: 'Kuwaiti Dinar', code: 'KWD', symbol_native: 'د.ك.‏' }, { symbol: 'KZT', name: 'Kazakhstani Tenge', code: 'KZT', symbol_native: 'тңг.' }, { symbol: 'LB£', name: 'Lebanese Pound', code: 'LBP', symbol_native: 'ل.ل.‏' }, { symbol: 'SLRs', name: 'Sri Lankan Rupee', code: 'LKR', symbol_native: 'SL Re' }, { symbol: 'Lt', name: 'Lithuanian Litas', code: 'LTL', symbol_native: 'Lt' }, { symbol: 'Ls', name: 'Latvian Lats', code: 'LVL', symbol_native: 'Ls' }, { symbol: 'LD', name: 'Libyan Dinar', code: 'LYD', symbol_native: 'د.ل.‏' }, { symbol: 'MAD', name: 'Moroccan Dirham', code: 'MAD', symbol_native: 'د.م.‏' }, { symbol: 'MDL', name: 'Moldovan Leu', code: 'MDL', symbol_native: 'MDL' }, { symbol: 'MGA', name: 'Malagasy Ariary', code: 'MGA', symbol_native: 'MGA' }, { symbol: 'MKD', name: 'Macedonian Denar', code: 'MKD', symbol_native: 'MKD' }, { symbol: 'MMK', name: 'Myanma Kyat', code: 'MMK', symbol_native: 'K' }, { symbol: 'MOP$', name: 'Macanese Pataca', code: 'MOP', symbol_native: 'MOP$' }, { symbol: 'MURs', name: 'Mauritian Rupee', code: 'MUR', symbol_native: 'MURs' }, { symbol: 'MX$', name: 'Mexican Peso', code: 'MXN', symbol_native: '$' }, { symbol: 'RM', name: 'Malaysian Ringgit', code: 'MYR', symbol_native: 'RM' }, { symbol: 'MTn', name: 'Mozambican Metical', code: 'MZN', symbol_native: 'MTn' }, { symbol: 'N$', name: 'Namibian Dollar', code: 'NAD', symbol_native: 'N$' }, { symbol: '₦', name: 'Nigerian Naira', code: 'NGN', symbol_native: '₦' }, { symbol: 'C$', name: 'Nicaraguan Córdoba', code: 'NIO', symbol_native: 'C$' }, { symbol: 'Nkr', name: 'Norwegian Krone', code: 'NOK', symbol_native: 'kr' }, { symbol: 'NPRs', name: 'Nepalese Rupee', code: 'NPR', symbol_native: 'नेरू' }, { symbol: 'NZ$', name: 'New Zealand Dollar', code: 'NZD', symbol_native: '$' }, { symbol: 'OMR', name: 'Omani Rial', code: 'OMR', symbol_native: 'ر.ع.‏' }, { symbol: 'B/.', name: 'Panamanian Balboa', code: 'PAB', symbol_native: 'B/.' }, { symbol: 'S/.', name: 'Peruvian Nuevo Sol', code: 'PEN', symbol_native: 'S/.' }, { symbol: '₱', name: 'Philippine Peso', code: 'PHP', symbol_native: '₱' }, { symbol: 'PKRs', name: 'Pakistani Rupee', code: 'PKR', symbol_native: '₨' }, { symbol: 'zł', name: 'Polish Zloty', code: 'PLN', symbol_native: 'zł' }, { symbol: '₲', name: 'Paraguayan Guarani', code: 'PYG', symbol_native: '₲' }, { symbol: 'QR', name: 'Qatari Rial', code: 'QAR', symbol_native: 'ر.ق.‏' }, { symbol: 'RON', name: 'Romanian Leu', code: 'RON', symbol_native: 'RON' }, { symbol: 'din.', name: 'Serbian Dinar', code: 'RSD', symbol_native: 'дин.' }, { symbol: 'RUB', name: 'Russian Ruble', code: 'RUB', symbol_native: '₽.' }, { symbol: 'RWF', name: 'Rwandan Franc', code: 'RWF', symbol_native: 'FR' }, { symbol: 'SR', name: 'Saudi Riyal', code: 'SAR', symbol_native: 'ر.س.‏' }, { symbol: 'SDG', name: 'Sudanese Pound', code: 'SDG', symbol_native: 'SDG' }, { symbol: 'Skr', name: 'Swedish Krona', code: 'SEK', symbol_native: 'kr' }, { symbol: 'S$', name: 'Singapore Dollar', code: 'SGD', symbol_native: '$' }, { symbol: 'Ssh', name: 'Somali Shilling', code: 'SOS', symbol_native: 'Ssh' }, { symbol: 'SY£', name: 'Syrian Pound', code: 'SYP', symbol_native: 'ل.س.‏' }, { symbol: '฿', name: 'Thai Baht', code: 'THB', symbol_native: '฿' }, { symbol: 'DT', name: 'Tunisian Dinar', code: 'TND', symbol_native: 'د.ت.‏' }, { symbol: 'T$', name: 'Tongan Paʻanga', code: 'TOP', symbol_native: 'T$' }, { symbol: 'TL', name: 'Turkish Lira', code: 'TRY', symbol_native: 'TL' }, { symbol: 'TT$', name: 'Trinidad and Tobago Dollar', code: 'TTD', symbol_native: '$' }, { symbol: 'NT$', name: 'New Taiwan Dollar', code: 'TWD', symbol_native: 'NT$' }, { symbol: 'TSh', name: 'Tanzanian Shilling', code: 'TZS', symbol_native: 'TSh' }, { symbol: '₴', name: 'Ukrainian Hryvnia', code: 'UAH', symbol_native: '₴' }, { symbol: 'USh', name: 'Ugandan Shilling', code: 'UGX', symbol_native: 'USh' }, { symbol: '$U', name: 'Uruguayan Peso', code: 'UYU', symbol_native: '$' }, { symbol: 'UZS', name: 'Uzbekistan Som', code: 'UZS', symbol_native: 'UZS' }, { symbol: 'Bs.F.', name: 'Venezuelan Bolívar', code: 'VEF', symbol_native: 'Bs.F.' }, { symbol: '₫', name: 'Vietnamese Dong', code: 'VND', symbol_native: '₫' }, { symbol: 'FCFA', name: 'CFA Franc BEAC', code: 'XAF', symbol_native: 'FCFA' }, { symbol: 'CFA', name: 'CFA Franc BCEAO', code: 'XOF', symbol_native: 'CFA' }, { symbol: 'YR', name: 'Yemeni Rial', code: 'YER', symbol_native: 'ر.ي.‏' }, { symbol: 'R', name: 'South African Rand', code: 'ZAR', symbol_native: 'R' }, { symbol: 'ZK', name: 'Zambian Kwacha', code: 'ZMK', symbol_native: 'ZK' }];
  currencyCode: string;
  currencySymbol: string;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private platform: Platform,
    private toast: ToastService,
    ) {
      this.platform.ready().then(() => {
        this.getSettings();
      });
    }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      currency: ['', [Validators.required]],
    });

  }

  saveSettings() {
    const currencyVal = this.currencies.find((cur) => {
      return cur.symbol_native === this.settingsForm.value.currency;
    });

    this.storageService.setCurrency(currencyVal);
    this.currencySymbol = this.settingsForm.value.currency; // to disable form for same value

    // toast
    this.toast.presentToast('Settings Saved!', 2000);
  }

  getSettings() {
    this.storageService.getLocation().code.then(val => {
      this.currencyCode = val;
    });
    this.storageService.getLocation().symbol.then(val => {
      this.currencySymbol = val;
    });
  }

}
