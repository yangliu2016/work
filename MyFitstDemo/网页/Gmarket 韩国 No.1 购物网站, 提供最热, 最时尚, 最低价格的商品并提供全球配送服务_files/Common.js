///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Common Javascript Area
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CharacterSet_SelectedIndexChanged(charSet) {
	var param = [{ name: 'charset', value: charSet}];

	$.ajax({
		type: "POST",
		cache: false,
		url: ("/AjaxCommon/AjaxCookieHandler"),
		data: param,
		success: function (result) {
			//alert(ResDict["COMMON_HF_ALERT_3"]);
			window.location.reload();
		}
	})
}

function CurrencySet_SelectedIndexChanged(currency) {
	var param = [{ name: 'currency', value: currency}];

	$.ajax({
		type: "POST",
		cache: false,
		url: ("/AjaxCommon/AjaxCurrencyCookieHandler"),
		data: param,
		success: function (result) {
			//alert(ResDict["COMMON_HF_ALERT_4"]);
			window.location.reload();
		}
	})
}

/*--------------------------------------------------------------------------*/
var INDEX_CSSROOT = "CssRoot";
var INDEX_SECURE_CSSROOT = "SecureCssRoot";
var INDEX_IMAGEROOT = "ImageRoot";
var INDEX_SECURE_IMAGEROOT = "SecureImageRoot";
var INDEX_SCRIPTROOT = "ScriptRoot";
var INDEX_SECURE_SCRIPTROOT = "SecureScriptRoot";
var INDEX_SIGNINROOT = "SignInRoot";
var INDEX_SECURE_SIGNINROOT = "SecureSignInRoot";

var INDEX_GLOBALROOT = "GlobalGmarketRoot";
var INDEX_CATEGORYROOT = "GlobalCategoryRoot";
var INDEX_LISTINGROOT = "GlobalListingRoot";
var INDEX_SEARCHROOT = "GlobalSearchRoot";
var INDEX_ITEMROOT = "GlobalItemRoot";
var INDEX_CORNERROOT = "GlobalCornerRoot";
var INDEX_SOHOROOT = "GlobalSohoRoot";

var INDEX_PROMOTIONROOT = "GlobalPromotionRoot";
var INDEX_SECURE_PROMOTIONROOT = "SecureGlobalPromotionRoot";
var INDEX_REWARDROOT = "GlobalRewardRoot";
var INDEX_SECURE_REWARDROOT = "SecureGlobalRewardRoot";
var INDEX_EVENTROOT = "GlobalEventRoot";
var INDEX_SECURE_EVENTROOT = "SecureGlobalEventRoot";

var INDEX_MYGROOT = "GlobalMyGRoot";
var INDEX_SECURE_MYGROOT = "SecureGlobalMyGRoot";
var INDEX_GBANKROOT = "GlobalGbankRoot";
var INDEX_SECURE_GBANKROOT = "SecureGlobalGbankRoot";
var INDEX_DIARYROOT = "GlobalDiaryRoot";
var INDEX_SECURE_DIARYROOT = "SecureGlobalDiaryRoot";
var INDEX_MEMBERROOT = "GlobalMemberRoot";
var INDEX_SECURE_MEMBERROOT = "SecureGlobalMemberRoot";
var INDEX_ESCROWROOT = "GlobalEscrowRoot";
var INDEX_SECURE_ESCROWROOT = "SecureGlobalEscrowRoot";

var INDEX_ENGLISHROOT = "EnglishRoot";
var INDEX_SECURE_ENGLISHROOT = "SecureEnglishRoot";

var INDEX_COMPANYROOT = "GlobalCompanyRoot";
var INDEX_PAGEROOT = "GlobalPageRoot";

var INDEX_SHOPROOT = "GlobalShopRoot";

var _IsHttps = null;
/* Script Url Contents  */
function CssUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_CSSROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_CSSROOT];
	}

	return rootPath.concat(relativePath);
}

function ImageUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_IMAGEROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_IMAGEROOT];
	}

	return rootPath.concat(relativePath);
}

function ScriptUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_SCRIPTROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_SCRIPTROOT];
	}

	return rootPath.concat(relativePath);
}

function SignInUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_SIGNINROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_SIGNINROOT];
	}

	return rootPath.concat(relativePath);
}

// Global
function GlobalUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_GLOBALROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_GLOBALROOT];
	}

	return rootPath.concat(relativePath);
}

function GlobalLink(relativePath) {
	rootPath = GlobalUri[INDEX_GLOBALROOT];
	return rootPath.concat(relativePath);
}

function GlobalSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_GLOBALROOT];
	return rootPath.concat(relativePath);
}

// Category
function CategoryUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_CATEGORYROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_CATEGORYROOT];
	}

	return rootPath.concat(relativePath);
}

function CategoryLink(relativePath) {
	rootPath = GlobalUri[INDEX_CATEGORYROOT];
	return rootPath.concat(relativePath);
}

function CategorySslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_CATEGORYROOT];
	return rootPath.concat(relativePath);
}

// Listing
function ListingUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_LISTINGROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_LISTINGROOT];
	}

	return rootPath.concat(relativePath);
}

function ListingLink(relativePath) {
	rootPath = GlobalUri[INDEX_LISTINGROOT];
	return rootPath.concat(relativePath);
}

function ListingSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_LISTINGROOT];
	return rootPath.concat(relativePath);
}

// Search
function SearchUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_SEARCHROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_SEARCHROOT];
	}

	return rootPath.concat(relativePath);
}

function SearchLink(relativePath) {
	rootPath = GlobalUri[INDEX_SEARCHROOT];
	return rootPath.concat(relativePath);
}

function SearchSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_SEARCHROOT];
	return rootPath.concat(relativePath);
}

// Item
function ItemUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_ITEMROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_ITEMROOT];
	}

	return rootPath.concat(relativePath);
}

function ItemLink(relativePath) {
	rootPath = GlobalUri[INDEX_ITEMROOT];
	return rootPath.concat(relativePath);
}

function ItemSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_ITEMROOT];
	return rootPath.concat(relativePath);
}

// Corner
function CornerUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_CORNERROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_CORNERROOT];
	}

	return rootPath.concat(relativePath);
}

function CornerLink(relativePath) {
	rootPath = GlobalUri[INDEX_CORNERROOT];
	return rootPath.concat(relativePath);
}

function CornerSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_CORNERROOT];
	return rootPath.concat(relativePath);
}

// Soho
function SohoUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_SOHOROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_SOHOROOT];
	}

	return rootPath.concat(relativePath);
}

function SohoLink(relativePath) {
	rootPath = GlobalUri[INDEX_SOHOROOT];
	return rootPath.concat(relativePath);
}

function SohoSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_SOHOROOT];
	return rootPath.concat(relativePath);
}

// Promotion
function PromotionUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_PROMOTIONROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_PROMOTIONROOT];
	}

	return rootPath.concat(relativePath);
}

function PromotionLink(relativePath) {
	rootPath = GlobalUri[INDEX_PROMOTIONROOT];
	return rootPath.concat(relativePath);
}

function PromotionSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_PROMOTIONROOT];
	return rootPath.concat(relativePath);
}

// Reward
function RewardUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_REWARDROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_REWARDROOT];
	}

	return rootPath.concat(relativePath);
}

function RewardLink(relativePath) {
	rootPath = GlobalUri[INDEX_REWARDROOT];
	return rootPath.concat(relativePath);
}

function RewardSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_REWARDROOT];
	return rootPath.concat(relativePath);
}

// Event
function EventUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_EVENTROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_EVENTROOT];
	}

	return rootPath.concat(relativePath);
}

function EventLink(relativePath) {
	rootPath = GlobalUri[INDEX_EVENTROOT];
	return rootPath.concat(relativePath);
}

function EventSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_EVENTROOT];
	return rootPath.concat(relativePath);
}

// MyG
function MyGUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_MYGROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_MYGROOT];
	}

	return rootPath.concat(relativePath);
}

function MyGLink(relativePath) {
	rootPath = GlobalUri[INDEX_MYGROOT];
	return rootPath.concat(relativePath);
}

function MyGSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_MYGROOT];
	return rootPath.concat(relativePath);
}

// Gbank
function GbankUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_GBANKROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_GBANKROOT];
	}

	return rootPath.concat(relativePath);
}

function GbankLink(relativePath) {
	rootPath = GlobalUri[INDEX_GBANKROOT];
	return rootPath.concat(relativePath);
}

function GbankSslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_GBANKROOT];
	return rootPath.concat(relativePath);
}

// Diary
function DiaryUrl(relativePath) {

	var rootPath = GlobalUri[INDEX_DIARYROOT];

	return rootPath.concat(relativePath);
}

function DiaryLink(relativePath) {
	rootPath = GlobalUri[INDEX_DIARYROOT];
	return rootPath.concat(relativePath);
}

function DiarySslLink(relativePath) {
	rootPath = GlobalUri[INDEX_SECURE_DIARYROOT];
	return rootPath.concat(relativePath);
}

// Member
function MemberUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_MEMBERROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_MEMBERROOT];
	}

	return rootPath.concat(relativePath);
}

function MemberLink(relativePath) {
	var rootPath = GlobalUri[INDEX_MEMBERROOT];
	return rootPath.concat(relativePath);
}

function MemberSslLink(relativePath) {
	var rootPath = GlobalUri[INDEX_SECURE_MEMBERROOT];
	return rootPath.concat(relativePath);
}

// Escrow
function EscrowUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_ESCROWROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_ESCROWROOT];
	}

	return rootPath.concat(relativePath);
}

function EscrowLink(relativePath) {
	var rootPath = GlobalUri[INDEX_ESCROWROOT];
	return rootPath.concat(relativePath);
}

function EscrowSslLink(relativePath) {
	var rootPath = GlobalUri[INDEX_SECURE_ESCROWROOT];
	return rootPath.concat(relativePath);
}

// English
function EnglishUrl(relativePath) {
	if (_IsHttps == null) {
		_IsHttps = document.location.protocol == "https:" ? true : false;
	}

	var rootPath = GlobalUri[INDEX_ENGLISHROOT];
	if (_IsHttps == true) {
		rootPath = GlobalUri[INDEX_SECURE_ENGLISHROOT];
	}

	return rootPath.concat(relativePath);
}

function EnglishLink(relativePath) {
	var rootPath = GlobalUri[INDEX_ENGLISHROOT];
	return rootPath.concat(relativePath);
}

function EnglishSslLink(relativePath) {
	var rootPath = GlobalUri[INDEX_SECURE_ENGLISHROOT];
	return rootPath.concat(relativePath);
}

// Company
function CompanyLink(relativePath) {
	var rootPath = GlobalUri[INDEX_COMPANYROOT];
	return rootPath.concat(relativePath);
}
// Page
function PageLink(relativePath) {
	var rootPath = GlobalUri[INDEX_PAGEROOT];
	return rootPath.concat(relativePath);
}

// Shop
function ShopLink(relativePath) {
	var rootPath = GlobalUri[INDEX_SHOPROOT];
	return rootPath.concat(relativePath);
}
