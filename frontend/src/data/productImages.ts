const placeholderUrl = '/placeholder.svg';

const placeholderImages = [placeholderUrl, placeholderUrl, placeholderUrl];

// Single image map (for backward compatibility)
export const productImageMap: Record<string, string> = {};

// Multi-image map (for galleries)
export const productImagesMap: Record<string, string[]> = {
  // Samsung Watches
  'sam-w6-44': placeholderImages,
  'sam-w7-40': placeholderImages,
  'sam-w7-44': placeholderImages,
  'sam-w8-40': placeholderImages,
  'sam-w8-44': placeholderImages,
  'sam-w8-46c': placeholderImages,
  'sam-wu-47': placeholderImages,
  'sam-fit3': placeholderImages,

  // Samsung Chargers
  'sam-15w': placeholderImages,
  'sam-25w': placeholderImages,
  'sam-45w': placeholderImages,

  // Samsung Buds
  'sam-buds3p': placeholderImages,
  'sam-buds3': placeholderImages,
  'sam-buds2p': placeholderImages,
  'sam-budsfe': placeholderImages,
  'sam-buds3fe': placeholderImages,
  'sam-budscore': placeholderImages,

  // Apple AirPods
  'app-airpodspro2': placeholderImages,
  'app-airpodspro3': placeholderImages,
  'app-airpod4nc': placeholderImages,
  'app-airpod4': placeholderImages,
  'app-airpods2': placeholderImages,

  // Apple Watches
  'app-s10-42': placeholderImages,
  'app-s10-46': placeholderImages,
  'app-se2-40': placeholderImages,
  'app-se2-44': placeholderImages,

  // Apple Accessories
  'app-pencil2': placeholderImages,
  'app-pencilc': placeholderImages,
  'app-pencilpro': placeholderImages,
  'app-mouse3': placeholderImages,
  'app-mouse4': placeholderImages,
  'app-airtag': placeholderImages,
  'app-battery': placeholderImages,

  // Logitech Mice
  'log-m90': placeholderImages,
  'log-ergo575': placeholderImages,
  'log-mx3s': placeholderImages,
  'log-mx4': placeholderImages,
  'log-m171': placeholderImages,
  'log-m185': placeholderImages,
  'log-m190': placeholderImages,
  'log-m196': placeholderImages,
  'log-lift': placeholderImages,
  'log-g102': placeholderImages,

  // Logitech Keyboards
  'log-k120': placeholderImages,
  'log-k250': placeholderImages,
  'log-mk220': placeholderImages,
  'log-pebble2': placeholderImages,
  'log-pebblecombo': placeholderImages,
  'log-mxkeyscombo': placeholderImages,
  'log-mxkeysmini': placeholderImages,

  // Logitech Webcams
  'log-brio4k': placeholderImages,
  'log-c270': placeholderImages,
  'log-brio100': placeholderImages,

  // Logitech Headsets
  'log-h340': placeholderImages,
  'log-h390': placeholderImages,
  'log-h111': placeholderImages,
  'log-zone100': placeholderImages,
  'log-zone300': placeholderImages,

  // Logitech Speakers
  'log-z906': placeholderImages,

  // Sony Headphones
  'sony-wh1000mx6': placeholderImages,
  'sony-wh1000mx5': placeholderImages,
  'sony-whch720': placeholderImages,
  'sony-whch520': placeholderImages,
  'sony-whult900': placeholderImages,

  // Sony Earbuds
  'sony-wfc710': placeholderImages,
  'sony-wfc510': placeholderImages,

  // Sony Speakers
  'sony-xb100': placeholderImages,
  'sony-field1': placeholderImages,
  'sony-field3': placeholderImages,
  'sony-field5': placeholderImages,

  // JBL Soundbars
  'jbl-sb550': placeholderImages,
  'jbl-21mk2': placeholderImages,
  'jbl-bar1300': placeholderImages,
  'jbl-bar1000': placeholderImages,
  'jbl-bar800': placeholderImages,
  'jbl-bar500': placeholderImages,

  // JBL PartyBox
  'jbl-partybox720': placeholderImages,
  'jbl-partybox1000': placeholderImages,
  'jbl-stage320': placeholderImages,
  'jbl-partybox120': placeholderImages,
  'jbl-partybox520': placeholderImages,
  'jbl-encomic': placeholderImages,
  'jbl-encoessential': placeholderImages,
  'jbl-otgmic': placeholderImages,
  'jbl-encoessential2': placeholderImages,

  // JBL Portable Speakers
  'jbl-boombox4': placeholderImages,
  'jbl-boombox3': placeholderImages,
  'jbl-goplay3': placeholderImages,
  'jbl-extreme4': placeholderImages,
  'jbl-onyx9': placeholderImages,
  'jbl-charge6': placeholderImages,
  'jbl-charge5': placeholderImages,
  'jbl-flip6': placeholderImages,
  'jbl-flip7': placeholderImages,
  'jbl-clip5': placeholderImages,
  'jbl-clip4': placeholderImages,
  'jbl-go4': placeholderImages,
  'jbl-pulse4': placeholderImages,

  // JBL Microphone
  'jbl-wirelessmic': placeholderImages,

  // JBL Wired Earphones
  'jbl-tune310c': placeholderImages,
  'jbl-tune110': placeholderImages,

  // JBL Earbuds
  'jbl-tourpro3': placeholderImages,
  'jbl-livepro2': placeholderImages,
  'jbl-tunebeam2': placeholderImages,
  'jbl-liveproplus': placeholderImages,
  'jbl-endurance3': placeholderImages,
  'jbl-wave200': placeholderImages,
  'jbl-liveflex': placeholderImages,
  'jbl-wavebuds2': placeholderImages,
  'jbl-wavebeam2': placeholderImages,
  'jbl-tunebuds2': placeholderImages,
  'jbl-waveflex': placeholderImages,
  'jbl-tuneflex2': placeholderImages,
  'jbl-tune125bt': placeholderImages,

  // JBL Headphones
  'jbl-tune670': placeholderImages,
  'jbl-live770': placeholderImages,
  'jbl-tune530': placeholderImages,
  'jbl-tune520': placeholderImages,
  'jbl-tune720': placeholderImages,
  'jbl-tune730': placeholderImages,
  'jbl-tune760': placeholderImages,
  'jbl-tune770': placeholderImages,
  'jbl-quantum100': placeholderImages,
  'jbl-quantum300': placeholderImages,
  'jbl-quantum350': placeholderImages,
  'jbl-tourone': placeholderImages,

  // Amazfit
  'amz-active2': placeholderImages,
  'amz-active2p': placeholderImages,
  'amz-pop3s': placeholderImages,
  'amz-gtr3pro': placeholderImages,
  'amz-trex3': placeholderImages,
  'amz-balance2': placeholderImages,
  'amz-balance': placeholderImages,
  'amz-gts2': placeholderImages,
  'amz-activeedge': placeholderImages,
  'amz-bip6': placeholderImages,

  // CMF
  'cmf-power100w': placeholderImages,
  'cmf-nothingear': placeholderImages,
  'cmf-neckbandpro': placeholderImages,
  'cmf-watch3pro': placeholderImages,
  'cmf-watchpro2': placeholderImages,
  'cmf-buds2a': placeholderImages,
  'cmf-buds2': placeholderImages,
  'cmf-buds2plus': placeholderImages,
  'cmf-budspro2': placeholderImages,

  // Cameras
  'insta-x5': placeholderImages,
  'insta-x4': placeholderImages,
  'gopro-hero12': placeholderImages,
  'gopro-hero13': placeholderImages,
  'dji-pocket3': placeholderImages,
  'dji-mobile7': placeholderImages,
  'dji-mobilese': placeholderImages,
  'dji-mobile7p': placeholderImages,
  'dji-mobile8': placeholderImages,

  // Anker Car Chargers
  'ank-car24w': placeholderImages,
  'ank-car67w': placeholderImages,

  // Anker Chargers & Cables
  'ank-3in1cube': placeholderImages,
  'ank-usba2c': placeholderImages,
  'ank-c2c240w': placeholderImages,
  'ank-3port65w': placeholderImages,
  'ank-45w': placeholderImages,

  // Anker Earbuds
  'ank-liberty4': placeholderImages,
  'ank-liberty5nc': placeholderImages,
  'ank-liberty4ncpro': placeholderImages,
  'ank-p30i': placeholderImages,
  'ank-k20i': placeholderImages,
  'ank-c40i': placeholderImages,
  'ank-r50i': placeholderImages,
  'ank-r50inc': placeholderImages,

  // Anker Power Banks
  'ank-maggo10k': placeholderImages,
  'ank-10kslim': placeholderImages,
  'ank-20k87w': placeholderImages,
  'ank-20k15w': placeholderImages,

  // Anker Headsets
  'ank-tune': placeholderImages,
  'ank-q30': placeholderImages,
  'ank-q45': placeholderImages,
  'ank-spaceonepro': placeholderImages,
  'ank-spaceone': placeholderImages,
  'ank-h30i': placeholderImages,
  'ank-q20plus': placeholderImages,
  'ank-lifeu2i': placeholderImages,

  // Anker Speakers
  'ank-select2': placeholderImages,
  'ank-boom2se': placeholderImages,
  'ank-select4go': placeholderImages,
  'ank-boom2': placeholderImages,

  // Anker Hub
  'ank-7in1hub': placeholderImages,

  // Gaming Consoles
  'ps5-pro': placeholderImages,
  'ps5-slim': placeholderImages,
  'ps5-slimdig': placeholderImages,
  'xbox-s': placeholderImages,
  'quest3s-128': placeholderImages,
  'quest3s-512': placeholderImages,
  'quest3s-256': placeholderImages,
  'switch2': placeholderImages,
  'switch-oled': placeholderImages,
  'steamdeck-512': placeholderImages,
  'steamdeck-1tb': placeholderImages,
  'ps5-portal': placeholderImages,
  'ps5-vr2': placeholderImages,
  'ps5-diskdrive': placeholderImages,
  'ps5-stand': placeholderImages,

  // Gaming Accessories
  'log-g29shifter': placeholderImages,
  'log-shifter': placeholderImages,
  'log-g29': placeholderImages,
  'ps5-pulse3d': placeholderImages,
  'ps5-elite': placeholderImages,
  'ps5-controller': placeholderImages,
  'ps5-edge': placeholderImages,
  'xbox-controller': placeholderImages,

  // PS5 Games
  'ps5-fc26': placeholderImages,
  'ps5-acshadows': placeholderImages,
  'ps5-astrobot': placeholderImages,
  'ps5-wukong': placeholderImages,
  'ps5-eldenring': placeholderImages,
  'ps5-nba2k26': placeholderImages,
  'ps5-gt7': placeholderImages,
  'ps5-gta5': placeholderImages,
  'ps5-hogwarts': placeholderImages,
  'ps5-ragnarok': placeholderImages,
  'ps5-lastofus1': placeholderImages,
  'ps5-lastofus2': placeholderImages,
  'ps5-spiderman2': placeholderImages,
  'ps5-cyberpunk': placeholderImages,
  'ps5-metalgear': placeholderImages,
  'ps5-cod7': placeholderImages,

  // Storage - SSDs
  'ssd-1tb-extreme': placeholderImages,
  'ssd-2tb-extreme': placeholderImages,
  'ssd-4tb-extreme': placeholderImages,
  'ssd-8tb-extreme': placeholderImages,
  'ssd-2tb-extremepro': placeholderImages,
  'ssd-4tb-extremepro': placeholderImages,
  'ssd-256-lexar': placeholderImages,
  'ssd-512-lexar': placeholderImages,

  // Storage - HDDs
  'hdd-1tb-trans': placeholderImages,
  'hdd-2tb-trans': placeholderImages,
  'hdd-1tb-wd': placeholderImages,
  'hdd-2tb-wd': placeholderImages,
  'hdd-4tb-wd': placeholderImages,
  'hdd-1tb-seagate': placeholderImages,
  'hdd-2tb-seagate': placeholderImages,
  'hdd-4tb-seagate': placeholderImages,
  'hdd-2tb-toshiba': placeholderImages,
  'hdd-4tb-toshiba': placeholderImages,

  // Memory Cards
  'sd-16gb': placeholderImages,
  'sd-32gb': placeholderImages,
  'sd-64gb': placeholderImages,
  'sd-128gb': placeholderImages,
  'sd-256gb': placeholderImages,
  'sd-512gb': placeholderImages,
  'sd-64gb-extreme': placeholderImages,
  'sd-128gb-extreme': placeholderImages,
  'sd-256gb-extreme': placeholderImages,
  'sd-512gb-extreme': placeholderImages,

  // Flash Drives
  'usb-16gb-blade': placeholderImages,
  'usb-32gb-blade': placeholderImages,
  'usb-64gb-blade': placeholderImages,
  'usb-128gb-blade': placeholderImages,
  'usb-32gb-flair': placeholderImages,
  'usb-64gb-flair': placeholderImages,
  'usb-128gb-flair': placeholderImages,
  'usb-256gb-flair': placeholderImages,
  'usb-512gb-flair': placeholderImages,
  'usb-64gb-typec': placeholderImages,
  'usb-128gb-typec': placeholderImages,
};

// Populate single image map from multi-image map
Object.entries(productImagesMap).forEach(([id, images]) => {
  productImageMap[id] = images[0];
});

