module.exports = () => {
    const stickers = [
        'CAADAgADxAADlSooAAERqDnEloQr1QI', // Andreas
        'CAADAgADxgADlSooAAETh9q30NIM-AI', // Roman
        'CAADAgADuAADlSooAAELhrwC16WIuQI', // Antonio
        'CAADAgADuQADlSooAAHHElpynZ_1wwI', // Lesha
        'CAADAgADuwADlSooAAH5d8yATNSCIwI', // Evgen
        'CAADAgADvAADlSooAAHNCwV_1LVlXgI', // Seva
        'CAADAgADsQADlSooAAFBBTeb26CoCAI', // Yurchik
        'CAADAgADswADlSooAAGUPZ-L_mpkfwI', // Leo
        'CAADAgADtwADlSooAAHXz8xxZwHabQI'  // Keanu
    ];
    return stickers[Math.floor(Math.random() * stickers.length)];
};
