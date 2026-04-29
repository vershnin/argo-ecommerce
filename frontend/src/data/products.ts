export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  inStock: boolean;
  badge?: string;
}

export const products: Product[] = [
  // SAMSUNG WATCHES
  { id: "sam-w6-44", name: "Samsung Watch 6 44mm", category: "Wearables", brand: "Samsung", price: 19800, inStock: true },
  { id: "sam-w7-40", name: "Samsung Watch 7 40mm", category: "Wearables", brand: "Samsung", price: 22000, inStock: true },
  { id: "sam-w7-44", name: "Samsung Watch 7 44mm", category: "Wearables", brand: "Samsung", price: 23650, inStock: true },
  { id: "sam-w8-40", name: "Samsung Watch 8 40mm", category: "Wearables", brand: "Samsung", price: 29150, inStock: false },
  { id: "sam-w8-44", name: "Samsung Watch 8 44mm", category: "Wearables", brand: "Samsung", price: 30250, inStock: true },
  { id: "sam-w8-46c", name: "Samsung Watch 8 46mm Classic", category: "Wearables", brand: "Samsung", price: 38500, inStock: true },
  { id: "sam-wu-47", name: "Samsung Watch Ultra 47mm 2025", category: "Wearables", brand: "Samsung", price: 47300, inStock: true },
  { id: "sam-fit3", name: "Samsung Fit 3", category: "Wearables", brand: "Samsung", price: 4950, inStock: true },

  // SAMSUNG CHARGERS
  { id: "sam-15w", name: "Samsung 15W Adapter", category: "Chargers", brand: "Samsung", price: 1650, inStock: true },
  { id: "sam-25w", name: "Samsung 25W Adapter with Cable", category: "Chargers", brand: "Samsung", price: 1980, inStock: true },
  { id: "sam-45w", name: "Samsung 45W Adapter with Cable", category: "Chargers", brand: "Samsung", price: 3300, inStock: true },

  // SAMSUNG BUDS
  { id: "sam-buds3p", name: "Samsung Buds3 Pro", category: "Audio", brand: "Samsung", price: 17600, inStock: true },
  { id: "sam-buds3", name: "Samsung Buds3", category: "Audio", brand: "Samsung", price: 9900, inStock: true },
  { id: "sam-buds2p", name: "Samsung Buds2 Pro", category: "Audio", brand: "Samsung", price: 14300, inStock: true },
  { id: "sam-budsfe", name: "Samsung Buds FE", category: "Audio", brand: "Samsung", price: 7480, inStock: true },
  { id: "sam-buds3fe", name: "Samsung Buds 3 FE", category: "Audio", brand: "Samsung", price: 14850, inStock: true },
  { id: "sam-budscore", name: "Samsung Buds Core", category: "Audio", brand: "Samsung", price: 4620, inStock: true },

  // APPLE EARPODS
  { id: "app-airpodspro2", name: "AirPods Pro 2 USB-C", category: "Audio", brand: "Apple", price: 26400, inStock: true },
  { id: "app-airpodspro3", name: "AirPods Pro 3", category: "Audio", brand: "Apple", price: 35200, inStock: false },
  { id: "app-airpod4nc", name: "AirPods 4 NC", category: "Audio", brand: "Apple", price: 23650, inStock: true },
  { id: "app-airpod4", name: "AirPods 4", category: "Audio", brand: "Apple", price: 16500, inStock: false },
  { id: "app-airpods2", name: "AirPods 2", category: "Audio", brand: "Apple", price: 15400, inStock: true },

  // APPLE WATCHES
  { id: "app-s10-42", name: "Apple Watch S10 42mm", category: "Wearables", brand: "Apple", price: 47300, inStock: false },
  { id: "app-s10-46", name: "Apple Watch S10 46mm", category: "Wearables", brand: "Apple", price: 50600, inStock: true },
  { id: "app-se2-40", name: "Apple Watch SE2 40mm", category: "Wearables", brand: "Apple", price: 29700, inStock: false },
  { id: "app-se2-44", name: "Apple Watch SE2 44mm", category: "Wearables", brand: "Apple", price: 34100, inStock: true },

  // APPLE ACCESSORIES
  { id: "app-pencil2", name: "Apple Pencil 2", category: "Computing", brand: "Apple", price: 12100, inStock: false },
  { id: "app-pencilc", name: "Apple Pencil USB-C", category: "Computing", brand: "Apple", price: 12100, inStock: true },
  { id: "app-pencilpro", name: "Apple Pencil Pro", category: "Computing", brand: "Apple", price: 17600, inStock: true },
  { id: "app-mouse3", name: "Apple Magic Mouse 3", category: "Computing", brand: "Apple", price: 9900, inStock: true },
  { id: "app-mouse4", name: "Apple Magic Mouse 4", category: "Computing", brand: "Apple", price: 11000, inStock: true },
  { id: "app-airtag", name: "Apple AirTag", category: "Wearables", brand: "Apple", price: 13200, inStock: true },
  { id: "app-battery", name: "Apple Battery Pack", category: "Chargers", brand: "Apple", price: 14300, inStock: false },

  // LOGITECH MICE
  { id: "log-m90", name: "Logitech M90", category: "Computing", brand: "Logitech", price: 528, inStock: true },
  { id: "log-ergo575", name: "Logitech Ergo M575", category: "Computing", brand: "Logitech", price: 7150, inStock: true },
  { id: "log-mx3s", name: "Logitech MX Master 3S For Business", category: "Computing", brand: "Logitech", price: 13200, inStock: true },
  { id: "log-mx4", name: "Logitech MX Master 4", category: "Computing", brand: "Logitech", price: 15950, inStock: false },
  { id: "log-m171", name: "Logitech M171", category: "Computing", brand: "Logitech", price: 1155, inStock: true },
  { id: "log-m185", name: "Logitech M185", category: "Computing", brand: "Logitech", price: 1298, inStock: true },
  { id: "log-m190", name: "Logitech M190", category: "Computing", brand: "Logitech", price: 1485, inStock: true },
  { id: "log-m196", name: "Logitech M196", category: "Computing", brand: "Logitech", price: 1320, inStock: true },
  { id: "log-lift", name: "Logitech Lift Ergo", category: "Computing", brand: "Logitech", price: 8250, inStock: true },
  { id: "log-g102", name: "Logitech G102 Gaming Mouse", category: "Computing", brand: "Logitech", price: 2640, inStock: true },

  // LOGITECH KEYBOARDS
  { id: "log-k120", name: "Logitech K120", category: "Computing", brand: "Logitech", price: 1320, inStock: true },
  { id: "log-k250", name: "Logitech K250", category: "Computing", brand: "Logitech", price: 2035, inStock: true },
  { id: "log-mk220", name: "Logitech MK220", category: "Computing", brand: "Logitech", price: 2530, inStock: true },
  { id: "log-pebble2", name: "Logitech Pebble Keys 2 K380S", category: "Computing", brand: "Logitech", price: 5830, inStock: false },
  { id: "log-pebblecombo", name: "Logitech Pebble 2 Combo", category: "Computing", brand: "Logitech", price: 7480, inStock: true },
  { id: "log-mxkeyscombo", name: "Logitech MX Keys S Combo", category: "Computing", brand: "Logitech", price: 28600, inStock: true },
  { id: "log-mxkeysmini", name: "Logitech MX Keys Mini", category: "Computing", brand: "Logitech", price: 15730, inStock: true },

  // LOGITECH WEBCAMS
  { id: "log-brio4k", name: "Logitech Brio 4K Stream Edition", category: "Computing", brand: "Logitech", price: 25300, inStock: true, badge: "HOT" },
  { id: "log-c270", name: "Logitech C270", category: "Computing", brand: "Logitech", price: 2970, inStock: false },
  { id: "log-brio100", name: "Logitech Brio 100", category: "Computing", brand: "Logitech", price: 5830, inStock: true },

  // LOGITECH HEADSETS
  { id: "log-h340", name: "Logitech H340", category: "Audio", brand: "Logitech", price: 2695, inStock: true },
  { id: "log-h390", name: "Logitech H390", category: "Audio", brand: "Logitech", price: 3630, inStock: true },
  { id: "log-h111", name: "Logitech H111", category: "Audio", brand: "Logitech", price: 1265, inStock: true },
  { id: "log-zone100", name: "Logitech Zone Vibe 100", category: "Audio", brand: "Logitech", price: 11000, inStock: true },
  { id: "log-zone300", name: "Logitech Zone 300", category: "Audio", brand: "Logitech", price: 10120, inStock: true },

  // LOGITECH SPEAKERS
  { id: "log-z906", name: "Logitech Z906 5.1 1000W", category: "Audio", brand: "Logitech", price: 49500, inStock: true },

  // SONY HEADSETS
  { id: "sony-wh1000mx6", name: "Sony WH-1000XM6", category: "Audio", brand: "Sony", price: 41800, inStock: true },
  { id: "sony-wh1000mx5", name: "Sony WH-1000XM5", category: "Audio", brand: "Sony", price: 31900, inStock: false },
  { id: "sony-whch720", name: "Sony WH-CH720", category: "Audio", brand: "Sony", price: 10450, inStock: false },
  { id: "sony-whch520", name: "Sony WH-CH520", category: "Audio", brand: "Sony", price: 4400, inStock: true },
  { id: "sony-whult900", name: "Sony WH-ULT900", category: "Audio", brand: "Sony", price: 16500, inStock: false },

  // SONY EARBUDS
  { id: "sony-wfc710", name: "Sony WF-C710", category: "Audio", brand: "Sony", price: 10450, inStock: false },
  { id: "sony-wfc510", name: "Sony WF-C510", category: "Audio", brand: "Sony", price: 7150, inStock: false },

  // SONY SPEAKERS
  { id: "sony-xb100", name: "Sony SRS-XB100", category: "Audio", brand: "Sony", price: 6600, inStock: true },
  { id: "sony-field1", name: "Sony SRS Field 1", category: "Audio", brand: "Sony", price: 11000, inStock: true },
  { id: "sony-field3", name: "Sony SRS Field 3", category: "Audio", brand: "Sony", price: 26400, inStock: true },
  { id: "sony-field5", name: "Sony SRS Field 5", category: "Audio", brand: "Sony", price: 33000, inStock: false },

  // JBL SPEAKERS & SOUNDBARS
  { id: "jbl-sb550", name: "JBL SB550", category: "Audio", brand: "JBL", price: 28600, inStock: false },
  { id: "jbl-21mk2", name: "JBL 2.1 MK2", category: "Audio", brand: "JBL", price: 35200, inStock: true },
  { id: "jbl-bar1300", name: "JBL Bar 1300 MK2", category: "Audio", brand: "JBL", price: 179300, inStock: true },
  { id: "jbl-bar1000", name: "JBL Bar 1000 MK2", category: "Audio", brand: "JBL", price: 119900, inStock: true },
  { id: "jbl-bar800", name: "JBL Bar 800 MK2", category: "Audio", brand: "JBL", price: 95700, inStock: true },
  { id: "jbl-bar500", name: "JBL Bar 500 MK2", category: "Audio", brand: "JBL", price: 69300, inStock: true },
  { id: "jbl-partybox720", name: "JBL PartyBox 720", category: "Audio", brand: "JBL", price: 114400, inStock: true },
  { id: "jbl-partybox1000", name: "JBL PartyBox 1000", category: "Audio", brand: "JBL", price: 104500, inStock: false },
  { id: "jbl-stage320", name: "JBL PartyBox Stage 320", category: "Audio", brand: "JBL", price: 59400, inStock: true },
  { id: "jbl-partybox120", name: "JBL PartyBox 120", category: "Audio", brand: "JBL", price: 40700, inStock: true },
  { id: "jbl-partybox520", name: "JBL PartyBox 520", category: "Audio", brand: "JBL", price: 81400, inStock: false },
  { id: "jbl-encomic", name: "JBL PartyBox Encore with Mic", category: "Audio", brand: "JBL", price: 39600, inStock: true },
  { id: "jbl-encoessential", name: "JBL PartyBox Encore Essential", category: "Audio", brand: "JBL", price: 31350, inStock: true },
  { id: "jbl-otgmic", name: "JBL PartyBox On The Go with Mic", category: "Audio", brand: "JBL", price: 39600, inStock: true },
  { id: "jbl-encoessential2", name: "JBL PartyBox Encore Essential 2", category: "Audio", brand: "JBL", price: 33000, inStock: true },
  { id: "jbl-boombox4", name: "JBL Boombox 4", category: "Audio", brand: "JBL", price: 70400, inStock: true },
  { id: "jbl-boombox3", name: "JBL Boombox 3", category: "Audio", brand: "JBL", price: 49500, inStock: false },
  { id: "jbl-goplay3", name: "JBL Go Play Plus 3", category: "Audio", brand: "JBL", price: 33000, inStock: false },
  { id: "jbl-extreme4", name: "JBL Xtreme 4", category: "Audio", brand: "JBL", price: 30800, inStock: true },
  { id: "jbl-onyx9", name: "JBL Onyx Studio 9", category: "Audio", brand: "JBL", price: 24200, inStock: true },
  { id: "jbl-charge6", name: "JBL Charge 6", category: "Audio", brand: "JBL", price: 17050, inStock: true },
  { id: "jbl-charge5", name: "JBL Charge 5", category: "Audio", brand: "JBL", price: 15400, inStock: true },
  { id: "jbl-flip6", name: "JBL Flip 6", category: "Audio", brand: "JBL", price: 11550, inStock: true },
  { id: "jbl-flip7", name: "JBL Flip 7", category: "Audio", brand: "JBL", price: 13750, inStock: true },
  { id: "jbl-clip5", name: "JBL Clip 5", category: "Audio", brand: "JBL", price: 6160, inStock: false },
  { id: "jbl-clip4", name: "JBL Clip 4", category: "Audio", brand: "JBL", price: 5500, inStock: true },
  { id: "jbl-go4", name: "JBL Go 4", category: "Audio", brand: "JBL", price: 4730, inStock: true },
  { id: "jbl-pulse4", name: "JBL Pulse 4", category: "Audio", brand: "JBL", price: 9900, inStock: true },
  { id: "jbl-wirelessmic", name: "JBL Wireless Microphone", category: "Audio", brand: "JBL", price: 13200, inStock: true },

  // JBL EARPHONES & EARBUDS
  { id: "jbl-tune310c", name: "JBL Tune 310C", category: "Audio", brand: "JBL", price: 1650, inStock: true },
  { id: "jbl-tune110", name: "JBL Tune 110", category: "Audio", brand: "JBL", price: 880, inStock: true },
  { id: "jbl-tourpro3", name: "JBL Tour Pro 3", category: "Audio", brand: "JBL", price: 33000, inStock: true },
  { id: "jbl-livepro2", name: "JBL Live Pro 2", category: "Audio", brand: "JBL", price: 15400, inStock: false },
  { id: "jbl-tunebeam2", name: "JBL TuneBeam 2", category: "Audio", brand: "JBL", price: 10780, inStock: true },
  { id: "jbl-liveproplus", name: "JBL Live Pro Plus", category: "Audio", brand: "JBL", price: 11000, inStock: true },
  { id: "jbl-endurance3", name: "JBL Endurance Peak 3", category: "Audio", brand: "JBL", price: 12100, inStock: false },
  { id: "jbl-wave200", name: "JBL Wave 200", category: "Audio", brand: "JBL", price: 4950, inStock: true },
  { id: "jbl-liveflex", name: "JBL Live Flex", category: "Audio", brand: "JBL", price: 15400, inStock: true },
  { id: "jbl-wavebuds2", name: "JBL WaveBuds 2", category: "Audio", brand: "JBL", price: 7150, inStock: true },
  { id: "jbl-wavebeam2", name: "JBL WaveBeam 2", category: "Audio", brand: "JBL", price: 7700, inStock: true },
  { id: "jbl-tunebuds2", name: "JBL TuneBuds 2", category: "Audio", brand: "JBL", price: 10450, inStock: true },
  { id: "jbl-waveflex", name: "JBL Wave Flex", category: "Audio", brand: "JBL", price: 6050, inStock: true },
  { id: "jbl-tuneflex2", name: "JBL TuneFlex 2", category: "Audio", brand: "JBL", price: 10780, inStock: true },
  { id: "jbl-tune125bt", name: "JBL Tune 125 BT", category: "Audio", brand: "JBL", price: 2750, inStock: true },

  // JBL HEADPHONES
  { id: "jbl-tune670", name: "JBL Tune 670", category: "Audio", brand: "JBL", price: 7700, inStock: false },
  { id: "jbl-live770", name: "JBL Live 770", category: "Audio", brand: "JBL", price: 15400, inStock: true },
  { id: "jbl-tune530", name: "JBL Tune 530", category: "Audio", brand: "JBL", price: 5280, inStock: true },
  { id: "jbl-tune520", name: "JBL Tune 520", category: "Audio", brand: "JBL", price: 4180, inStock: false },
  { id: "jbl-tune720", name: "JBL Tune 720", category: "Audio", brand: "JBL", price: 6050, inStock: true },
  { id: "jbl-tune730", name: "JBL Tune 730", category: "Audio", brand: "JBL", price: 6380, inStock: true },
  { id: "jbl-tune760", name: "JBL Tune 760", category: "Audio", brand: "JBL", price: 8250, inStock: false },
  { id: "jbl-tune770", name: "JBL Tune 770", category: "Audio", brand: "JBL", price: 8250, inStock: true },
  { id: "jbl-quantum100", name: "JBL Quantum 100", category: "Audio", brand: "JBL", price: 4730, inStock: false },
  { id: "jbl-quantum300", name: "JBL Quantum 300", category: "Audio", brand: "JBL", price: 7700, inStock: false },
  { id: "jbl-quantum350", name: "JBL Quantum 350", category: "Audio", brand: "JBL", price: 10450, inStock: true },
  { id: "jbl-tourone", name: "JBL Tour One M2", category: "Audio", brand: "JBL", price: 28600, inStock: false },

  // AMAZFIT
  { id: "amz-active2", name: "Amazfit Active 2", category: "Wearables", brand: "Amazfit", price: 14850, inStock: true },
  { id: "amz-active2p", name: "Amazfit Active 2 Premium", category: "Wearables", brand: "Amazfit", price: 20900, inStock: true },
  { id: "amz-pop3s", name: "Amazfit Pop 3S", category: "Wearables", brand: "Amazfit", price: 6050, inStock: true },
  { id: "amz-gtr3pro", name: "Amazfit GTR3 Pro", category: "Wearables", brand: "Amazfit", price: 17600, inStock: true },
  { id: "amz-trex3", name: "Amazfit T-Rex 3", category: "Wearables", brand: "Amazfit", price: 31900, inStock: true },
  { id: "amz-balance2", name: "Amazfit Balance 2", category: "Wearables", brand: "Amazfit", price: 39600, inStock: true },
  { id: "amz-balance", name: "Amazfit Balance", category: "Wearables", brand: "Amazfit", price: 20350, inStock: true },
  { id: "amz-gts2", name: "Amazfit GTS2", category: "Wearables", brand: "Amazfit", price: 10450, inStock: true },
  { id: "amz-activeedge", name: "Amazfit Active Edge", category: "Wearables", brand: "Amazfit", price: 12650, inStock: true },
  { id: "amz-bip6", name: "Amazfit Bip 6", category: "Wearables", brand: "Amazfit", price: 13200, inStock: true },

  // CMF
  { id: "cmf-power100w", name: "CMF Power 100W Gang", category: "Chargers", brand: "CMF", price: 4400, inStock: true },
  { id: "cmf-nothingear", name: "CMF Nothing Ear", category: "Audio", brand: "CMF", price: 8800, inStock: true },
  { id: "cmf-neckbandpro", name: "CMF Neckband Pro", category: "Audio", brand: "CMF", price: 3850, inStock: true },
  { id: "cmf-watch3pro", name: "CMF Watch 3 Pro", category: "Wearables", brand: "CMF", price: 11550, inStock: true },
  { id: "cmf-watchpro2", name: "CMF Watch Pro 2", category: "Wearables", brand: "CMF", price: 7150, inStock: true },
  { id: "cmf-buds2a", name: "CMF Buds 2A", category: "Audio", brand: "CMF", price: 4180, inStock: true },
  { id: "cmf-buds2", name: "CMF Buds 2", category: "Audio", brand: "CMF", price: 5280, inStock: true },
  { id: "cmf-buds2plus", name: "CMF Buds 2 Plus", category: "Audio", brand: "CMF", price: 6050, inStock: true },
  { id: "cmf-budspro2", name: "CMF Buds Pro 2", category: "Audio", brand: "CMF", price: 6050, inStock: true },

  // CAMERAS & ACTION CAMS
  { id: "insta-x5", name: "Insta360 X5", category: "Cameras", brand: "Insta360", price: 66000, inStock: false },
  { id: "insta-x4", name: "Insta360 X4", category: "Cameras", brand: "Insta360", price: 53900, inStock: true },
  { id: "gopro-hero12", name: "GoPro Hero 12", category: "Cameras", brand: "GoPro", price: 38500, inStock: false },
  { id: "gopro-hero13", name: "GoPro Hero 13 with Memory", category: "Cameras", brand: "GoPro", price: 49500, inStock: true },
  { id: "dji-pocket3", name: "DJI Osmo Pocket 3 Creator Edition", category: "Cameras", brand: "DJI", price: 80300, inStock: false },
  { id: "dji-mobile7", name: "DJI Osmo Mobile 7", category: "Cameras", brand: "DJI", price: 14850, inStock: true },
  { id: "dji-mobilese", name: "DJI Osmo Mobile SE", category: "Cameras", brand: "DJI", price: 10450, inStock: true },
  { id: "dji-mobile7p", name: "DJI Osmo Mobile 7P", category: "Cameras", brand: "DJI", price: 18700, inStock: true },
  { id: "dji-mobile8", name: "DJI Osmo Mobile 8", category: "Cameras", brand: "DJI", price: 20900, inStock: true },

  // ANKER CAR CHARGERS
  { id: "ank-car24w", name: "Anker Car Charger 24W USB-A", category: "Chargers", brand: "Anker", price: 1650, inStock: true },
  { id: "ank-car67w", name: "Anker Car Charger 67W with Cable", category: "Chargers", brand: "Anker", price: 3080, inStock: true },

  // ANKER CHARGERS & CABLES
  { id: "ank-3in1cube", name: "Anker 3-in-1 Cube with MagSafe", category: "Chargers", brand: "Anker", price: 9900, inStock: true },
  { id: "ank-usba2c", name: "Anker USB-A to USB-C Cable", category: "Chargers", brand: "Anker", price: 1100, inStock: true },
  { id: "ank-c2c240w", name: "Anker C to C 240W Cable", category: "Chargers", brand: "Anker", price: 1320, inStock: true },
  { id: "ank-3port65w", name: "Anker 3-Port 65W Charger", category: "Chargers", brand: "Anker", price: 3850, inStock: true },
  { id: "ank-45w", name: "Anker 45W Charger", category: "Chargers", brand: "Anker", price: 2750, inStock: true },

  // ANKER EARBUDS
  { id: "ank-liberty4", name: "Anker Liberty 4", category: "Audio", brand: "Anker", price: 7150, inStock: true },
  { id: "ank-liberty5nc", name: "Anker Liberty 5 NC", category: "Audio", brand: "Anker", price: 9900, inStock: true },
  { id: "ank-liberty4ncpro", name: "Anker Liberty 4 NC Pro", category: "Audio", brand: "Anker", price: 11550, inStock: true },
  { id: "ank-p30i", name: "Anker P30i", category: "Audio", brand: "Anker", price: 3300, inStock: false },
  { id: "ank-k20i", name: "Anker K20i", category: "Audio", brand: "Anker", price: 2200, inStock: true },
  { id: "ank-c40i", name: "Anker C40i", category: "Audio", brand: "Anker", price: 6600, inStock: false },
  { id: "ank-r50i", name: "Anker R50i", category: "Audio", brand: "Anker", price: 2090, inStock: true },
  { id: "ank-r50inc", name: "Anker R50i NC", category: "Audio", brand: "Anker", price: 2970, inStock: false },

  // ANKER POWER BANKS
  { id: "ank-maggo10k", name: "Anker Magnetic MagGo Battery 10000mAh", category: "Chargers", brand: "Anker", price: 7700, inStock: true },
  { id: "ank-10kslim", name: "Anker 10000mAh Slim", category: "Chargers", brand: "Anker", price: 2750, inStock: false },
  { id: "ank-20k87w", name: "Anker 20K 87W", category: "Chargers", brand: "Anker", price: 7700, inStock: false },
  { id: "ank-20k15w", name: "Anker 20K 15W", category: "Chargers", brand: "Anker", price: 6050, inStock: true },

  // ANKER HEADSETS
  { id: "ank-tune", name: "Anker Tune", category: "Audio", brand: "Anker", price: 5500, inStock: true },
  { id: "ank-q30", name: "Anker Q30", category: "Audio", brand: "Anker", price: 7700, inStock: true },
  { id: "ank-q45", name: "Anker Q45", category: "Audio", brand: "Anker", price: 11000, inStock: true },
  { id: "ank-spaceonepro", name: "Anker Space One Pro", category: "Audio", brand: "Anker", price: 14300, inStock: false },
  { id: "ank-spaceone", name: "Anker Space One", category: "Audio", brand: "Anker", price: 8250, inStock: true },
  { id: "ank-h30i", name: "Anker H30i", category: "Audio", brand: "Anker", price: 3300, inStock: true },
  { id: "ank-q20plus", name: "Anker Q20+", category: "Audio", brand: "Anker", price: 5170, inStock: false },
  { id: "ank-lifeu2i", name: "Anker Life U2i Neckband", category: "Audio", brand: "Anker", price: 2750, inStock: true },

  // ANKER SPEAKERS
  { id: "ank-select2", name: "Anker Select 2", category: "Audio", brand: "Anker", price: 3850, inStock: false },
  { id: "ank-boom2se", name: "Anker Boom2 SE", category: "Audio", brand: "Anker", price: 9900, inStock: true },
  { id: "ank-select4go", name: "Anker Select 4 Go", category: "Audio", brand: "Anker", price: 3300, inStock: true },
  { id: "ank-boom2", name: "Anker Boom2", category: "Audio", brand: "Anker", price: 13200, inStock: false },
  { id: "ank-7in1hub", name: "Anker 7-in-1 USB Hub", category: "Computing", brand: "Anker", price: 6050, inStock: true },

  // GAMING CONSOLES
  { id: "ps5-pro", name: "PlayStation 5 Pro", category: "Gaming", brand: "PlayStation", price: 100000, inStock: true },
  { id: "ps5-slim", name: "PlayStation 5 Slim", category: "Gaming", brand: "PlayStation", price: 73700, inStock: false },
  { id: "ps5-slimdig", name: "PlayStation 5 Slim Digital", category: "Gaming", brand: "PlayStation", price: 64900, inStock: false },
  { id: "xbox-s", name: "Xbox Series S", category: "Gaming", brand: "Xbox", price: 47300, inStock: false },
  { id: "quest3s-128", name: "Meta Quest 3S 128GB", category: "Gaming", brand: "Meta", price: 42900, inStock: false },
  { id: "quest3s-512", name: "Meta Quest 3S 512GB", category: "Gaming", brand: "Meta", price: 66000, inStock: true },
  { id: "quest3s-256", name: "Meta Quest 3S 256GB", category: "Gaming", brand: "Meta", price: 53900, inStock: true },
  { id: "switch2", name: "Nintendo Switch 2", category: "Gaming", brand: "Nintendo", price: 71500, inStock: true },
  { id: "switch-oled", name: "Nintendo Switch OLED", category: "Gaming", brand: "Nintendo", price: 35200, inStock: false },
  { id: "steamdeck-512", name: "Steam Deck OLED 512GB", category: "Gaming", brand: "Steam", price: 84700, inStock: false },
  { id: "steamdeck-1tb", name: "Steam Deck 1TB", category: "Gaming", brand: "Steam", price: 101200, inStock: true },
  { id: "ps5-portal", name: "PlayStation Portal", category: "Gaming", brand: "PlayStation", price: 30800, inStock: true },
  { id: "ps5-vr2", name: "PlayStation VR2 Horizon", category: "Gaming", brand: "PlayStation", price: 59400, inStock: false },
  { id: "ps5-diskdrive", name: "PlayStation 5 Disk Drive", category: "Gaming", brand: "PlayStation", price: 16500, inStock: true },
  { id: "ps5-stand", name: "PlayStation 5 Vertical Stand", category: "Gaming", brand: "PlayStation", price: 3300, inStock: true },

  // GAMING ACCESSORIES
  { id: "log-g29shifter", name: "Logitech G29 Plus Shifter Bundle", category: "Gaming", brand: "Logitech", price: 38500, inStock: true, badge: "Bundle" },
  { id: "log-shifter", name: "Logitech Driving Force Shifter", category: "Gaming", brand: "Logitech", price: 6600, inStock: true },
  { id: "log-g29", name: "Logitech G29", category: "Gaming", brand: "Logitech", price: 33000, inStock: true },
  { id: "ps5-pulse3d", name: "PlayStation Pulse 3D Headset", category: "Gaming", brand: "PlayStation", price: 12100, inStock: true },
  { id: "ps5-elite", name: "PlayStation Elite Headset", category: "Gaming", brand: "PlayStation", price: 18700, inStock: true },
  { id: "ps5-controller", name: "PlayStation 5 Controller", category: "Gaming", brand: "PlayStation", price: 8800, inStock: true },
  { id: "ps5-edge", name: "PlayStation Edge Controller", category: "Gaming", brand: "PlayStation", price: 25300, inStock: true },
  { id: "xbox-controller", name: "Xbox Series X Controller", category: "Gaming", brand: "Xbox", price: 7150, inStock: true },

  // PS5 GAMES (Selection)
  { id: "ps5-fc26", name: "FC 26 (PS5)", category: "Games", brand: "PlayStation", price: 6050, inStock: true },
  { id: "ps5-acshadows", name: "Assassin's Creed Shadows (PS5)", category: "Games", brand: "PlayStation", price: 6930, inStock: true },
  { id: "ps5-astrobot", name: "Astro Bot (PS5)", category: "Games", brand: "PlayStation", price: 7480, inStock: true },
  { id: "ps5-wukong", name: "Black Myth: Wukong (PS5)", category: "Games", brand: "PlayStation", price: 7480, inStock: true },
  { id: "ps5-eldenring", name: "Elden Ring (PS5)", category: "Games", brand: "PlayStation", price: 4070, inStock: true },
  { id: "ps5-nba2k26", name: "NBA 2K26 (PS5)", category: "Games", brand: "PlayStation", price: 6050, inStock: true },
  { id: "ps5-gt7", name: "Gran Turismo 7 (PS5)", category: "Games", brand: "PlayStation", price: 5170, inStock: true },
  { id: "ps5-gta5", name: "GTA V (PS5)", category: "Games", brand: "PlayStation", price: 3630, inStock: true },
  { id: "ps5-hogwarts", name: "Hogwarts Legacy (PS5)", category: "Games", brand: "PlayStation", price: 4180, inStock: true },
  { id: "ps5-ragnarok", name: "God of War Ragnarok (PS5)", category: "Games", brand: "PlayStation", price: 4840, inStock: true },
  { id: "ps5-lastofus1", name: "The Last of Us Part I (PS5)", category: "Games", brand: "PlayStation", price: 4950, inStock: true },
  { id: "ps5-lastofus2", name: "The Last of Us Part II (PS5)", category: "Games", brand: "PlayStation", price: 5500, inStock: true },
  { id: "ps5-spiderman2", name: "Spider-Man 2 (PS5)", category: "Games", brand: "PlayStation", price: 5830, inStock: true },
  { id: "ps5-cyberpunk", name: "Cyberpunk 2077 (PS5)", category: "Games", brand: "PlayStation", price: 5500, inStock: true },
  { id: "ps5-metalgear", name: "Metal Gear Solid Collection (PS5)", category: "Games", brand: "PlayStation", price: 7700, inStock: true },
  { id: "ps5-cod7", name: "Call of Duty: Black Ops 7 (PS5)", category: "Games", brand: "PlayStation", price: 7700, inStock: true },

  // STORAGE - SSDs
  { id: "ssd-1tb-extreme", name: "SanDisk 1TB SSD Portable Extreme", category: "Storage", brand: "SanDisk", price: 20900, inStock: true },
  { id: "ssd-2tb-extreme", name: "SanDisk 2TB SSD Portable Extreme", category: "Storage", brand: "SanDisk", price: 29700, inStock: true },
  { id: "ssd-4tb-extreme", name: "SanDisk 4TB SSD Portable Extreme", category: "Storage", brand: "SanDisk", price: 49500, inStock: true },
  { id: "ssd-8tb-extreme", name: "SanDisk 8TB SSD Portable Extreme", category: "Storage", brand: "SanDisk", price: 77000, inStock: true },
  { id: "ssd-2tb-extremepro", name: "SanDisk 2TB SSD Extreme Pro", category: "Storage", brand: "SanDisk", price: 40700, inStock: true },
  { id: "ssd-4tb-extremepro", name: "SanDisk 4TB SSD Extreme Pro", category: "Storage", brand: "SanDisk", price: 60500, inStock: true },
  { id: "ssd-256-lexar", name: "Lexar 256GB SSD", category: "Storage", brand: "Lexar", price: 3850, inStock: true },
  { id: "ssd-512-lexar", name: "Lexar 512GB SSD", category: "Storage", brand: "Lexar", price: 6050, inStock: true },

  // STORAGE - HDDs
  { id: "hdd-1tb-trans", name: "Transcend 1TB External HDD", category: "Storage", brand: "Transcend", price: 9900, inStock: false },
  { id: "hdd-2tb-trans", name: "Transcend 2TB External HDD", category: "Storage", brand: "Transcend", price: 13200, inStock: true },
  { id: "hdd-1tb-wd", name: "WD 1TB External HDD", category: "Storage", brand: "Western Digital", price: 8800, inStock: true },
  { id: "hdd-2tb-wd", name: "WD 2TB External HDD", category: "Storage", brand: "Western Digital", price: 10450, inStock: true },
  { id: "hdd-4tb-wd", name: "WD 4TB External HDD", category: "Storage", brand: "Western Digital", price: 15400, inStock: true },
  { id: "hdd-1tb-seagate", name: "Seagate 1TB External HDD", category: "Storage", brand: "Seagate", price: 7700, inStock: true },
  { id: "hdd-2tb-seagate", name: "Seagate 2TB External HDD", category: "Storage", brand: "Seagate", price: 10450, inStock: true },
  { id: "hdd-4tb-seagate", name: "Seagate 4TB External HDD", category: "Storage", brand: "Seagate", price: 15400, inStock: true },
  { id: "hdd-2tb-toshiba", name: "Toshiba 2TB External HDD", category: "Storage", brand: "Toshiba", price: 10450, inStock: true },
  { id: "hdd-4tb-toshiba", name: "Toshiba 4TB External HDD", category: "Storage", brand: "Toshiba", price: 15400, inStock: true },

  // MEMORY CARDS
  { id: "sd-16gb", name: "SanDisk 16GB MicroSD Class 10", category: "Storage", brand: "SanDisk", price: 660, inStock: true },
  { id: "sd-32gb", name: "SanDisk 32GB MicroSD Class 10", category: "Storage", brand: "SanDisk", price: 770, inStock: true },
  { id: "sd-64gb", name: "SanDisk 64GB MicroSD Class 10", category: "Storage", brand: "SanDisk", price: 1100, inStock: true },
  { id: "sd-128gb", name: "SanDisk 128GB MicroSD Class 10", category: "Storage", brand: "SanDisk", price: 1650, inStock: true },
  { id: "sd-256gb", name: "SanDisk 256GB MicroSD Class 10", category: "Storage", brand: "SanDisk", price: 3300, inStock: true },
  { id: "sd-512gb", name: "SanDisk 512GB MicroSD Class 10", category: "Storage", brand: "SanDisk", price: 5500, inStock: true },
  { id: "sd-64gb-extreme", name: "SanDisk 64GB MicroSD Extreme Pro", category: "Storage", brand: "SanDisk", price: 2200, inStock: true },
  { id: "sd-128gb-extreme", name: "SanDisk 128GB MicroSD Extreme Pro", category: "Storage", brand: "SanDisk", price: 3850, inStock: true },
  { id: "sd-256gb-extreme", name: "SanDisk 256GB MicroSD Extreme Pro", category: "Storage", brand: "SanDisk", price: 6050, inStock: true },
  { id: "sd-512gb-extreme", name: "SanDisk 512GB MicroSD Extreme Pro", category: "Storage", brand: "SanDisk", price: 9900, inStock: true },

  // FLASH DRIVES
  { id: "usb-16gb-blade", name: "SanDisk 16GB Cruzer Blade", category: "Storage", brand: "SanDisk", price: 550, inStock: true },
  { id: "usb-32gb-blade", name: "SanDisk 32GB Cruzer Blade", category: "Storage", brand: "SanDisk", price: 605, inStock: true },
  { id: "usb-64gb-blade", name: "SanDisk 64GB Cruzer Blade", category: "Storage", brand: "SanDisk", price: 770, inStock: true },
  { id: "usb-128gb-blade", name: "SanDisk 128GB Cruzer Blade", category: "Storage", brand: "SanDisk", price: 1320, inStock: true },
  { id: "usb-32gb-flair", name: "SanDisk 32GB Ultra Flair", category: "Storage", brand: "SanDisk", price: 770, inStock: true },
  { id: "usb-64gb-flair", name: "SanDisk 64GB Ultra Flair", category: "Storage", brand: "SanDisk", price: 990, inStock: true },
  { id: "usb-128gb-flair", name: "SanDisk 128GB Ultra Flair", category: "Storage", brand: "SanDisk", price: 1650, inStock: true },
  { id: "usb-256gb-flair", name: "SanDisk 256GB Ultra Flair", category: "Storage", brand: "SanDisk", price: 3300, inStock: true },
  { id: "usb-512gb-flair", name: "SanDisk 512GB Ultra Flair", category: "Storage", brand: "SanDisk", price: 5500, inStock: true },
  { id: "usb-64gb-typec", name: "SanDisk 64GB USB Type-C", category: "Storage", brand: "SanDisk", price: 1100, inStock: true },
  { id: "usb-128gb-typec", name: "SanDisk 128GB USB Type-C", category: "Storage", brand: "SanDisk", price: 1650, inStock: true },
];

export const categories = [
  { id: "audio", name: "Audio", icon: "Headphones", description: "Sony, JBL, Anker & more" },
  { id: "wearables", name: "Wearables", icon: "Watch", description: "Apple Watch, Samsung, Amazfit" },
  { id: "storage", name: "Storage", icon: "HardDrive", description: "SanDisk, SSDs, Flash Drives" },
  { id: "computing", name: "Computing", icon: "Mouse", description: "Logitech, Keyboards, Webcams" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2", description: "PlayStation, Xbox, Nintendo" },
  { id: "cameras", name: "Cameras", icon: "Camera", description: "GoPro, Insta360, DJI" },
  { id: "chargers", name: "Chargers", icon: "BatteryCharging", description: "Anker, Samsung, Apple" },
  { id: "games", name: "Games", icon: "Disc", description: "PS5 & PS4 Game Titles" },
];

export const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "JBL",
  "Anker",
  "Logitech",
  "Amazfit",
  "CMF",
  "SanDisk",
  "PlayStation",
  "Nintendo",
  "GoPro",
  "DJI",
  "Insta360",
  "Meta",
  "Xbox",
  "Lexar",
  "Seagate",
  "Western Digital",
  "Transcend",
  "Toshiba",
  "Steam",
];

export function formatPrice(price: number): string {
  return `KSH ${price.toLocaleString()}`;
}

export function generateWhatsAppLink(productName: string, price: number): string {
  const message = encodeURIComponent(
    `Hi Argo Electronics, I am interested in ${productName} priced at ${formatPrice(price)}. Is it available?`
  );
  return `https://wa.me/254700000000?text=${message}`;
}
