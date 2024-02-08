// Para resetar os Save States, descomente a próxima linha e recarregue a página

// localStorage.clear();

// Inputs e displays:

    const titleButtonElement = document.getElementById('title-screen-button');

    const playButtonElement = document.getElementById('play-button');
    const optionsButtonElement = document.getElementById('options-button');
    const exitButtonElement = document.getElementById('exit-button');

    const optionsAudioButtonElement = document.getElementById('options-screen-audio-button');
    const optionsControlsButtonElement = document.getElementById('options-screen-controls-button');

    const musicVolumeSliderElement = document.getElementById('music-volume-slider');
    let musicVolumeDisplayElement = document.getElementById('music-volume-display');
    const sfxVolumeSliderElement = document.getElementById('sfx-volume-slider');
    let sfxVolumeDisplayElement = document.getElementById('sfx-volume-display');

    const changeMoveUpKeyButtonElement = document.getElementById('moveUp-controls-button');
    const changeMoveDownKeyButtonElement = document.getElementById('moveDown-controls-button');
    const changeMoveLeftKeyButtonElement = document.getElementById('moveLeft-controls-button');
    const changeMoveRightKeyButtonElement = document.getElementById('moveRight-controls-button');
    const changeSelectKeyButtonElement = document.getElementById('select-controls-button');
    const changeBackKeyButtonElement = document.getElementById('back-controls-button');

    const savedMusicVolume = JSON.parse(localStorage.getItem('savedMusicVolume')) !== null ? JSON.parse(localStorage.getItem('savedMusicVolume')) : 0.2;
    const savedSfxVolume = JSON.parse(localStorage.getItem('savedSfxVolume')) !== null ? JSON.parse(localStorage.getItem('savedSfxVolume')) : 0.5;

    const savedMoveUpKey = JSON.parse(localStorage.getItem('savedMoveUpKey')) !== null ? JSON.parse(localStorage.getItem('savedMoveUpKey')) : 'w';
    const savedMoveDownKey = JSON.parse(localStorage.getItem('savedMoveDownKey')) !== null ? JSON.parse(localStorage.getItem('savedMoveDownKey')) : 's';
    const savedMoveLeftKey = JSON.parse(localStorage.getItem('savedMoveLeftKey')) !== null ? JSON.parse(localStorage.getItem('savedMoveLeftKey')) : 'a';
    const savedMoveRightKey = JSON.parse(localStorage.getItem('savedMoveRightKey')) !== null ? JSON.parse(localStorage.getItem('savedMoveRightKey')) : 'd';
    const savedSelectKey = JSON.parse(localStorage.getItem('savedSelectKey')) !== null ? JSON.parse(localStorage.getItem('savedSelectKey')) : ' ';
    const savedBackKey = JSON.parse(localStorage.getItem('savedBackKey')) !== null ? JSON.parse(localStorage.getItem('savedBackKey')) : 'Escape';

    const newGameButtonElement = document.getElementById('newgame-button');
    const continueGameButtonElement = document.getElementById('continue-button');

    const backFromLoadGameButtonElement = document.getElementById('backfromloadgame-button');
    const backFromOptionsButtonElement = document.getElementById('backfromoptions-button');
    const backFromAudioOptionsButtonElement = document.getElementById('backfromaudio-options-button');
    const backFromControlsOptionsButtonElement = document.getElementById('backfromcontrols-options-button');

    const nextButtonElement = document.getElementById('next-button');
    const endButtonElement = document.getElementById('end-screen-button');



// Telas

    showElement('title-screen');
    let activeScreenElement = document.querySelector('.active');
    let onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.hidden)');
    let hoveredButtonIndex = 0;


    function hideElement(hideElementId) {
        const element = document.getElementById(hideElementId);
        if(element.classList.contains('screen')) {
        element.classList.remove('active');
        }
        else {
        element.classList.add('hidden');
        }
    }

    function showElement(showElementId) {
        const element = document.getElementById(showElementId);
        if(element.classList.contains('screen')) {
        element.classList.add('active');
        }
        else {
        element.classList.remove('hidden');
        }
    }    

    function toggleScreen(hideElementId, showElementId) {
        hideElement(hideElementId);
        showElement(showElementId);
        updateScreen();
    }

    function updateScreen() {
        activeScreenElement = document.querySelector('.active');
        currentScreenId = activeScreenElement.id;
        onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.hidden)');
        hoveredButtonIndex = 0;
    }

    function updateBackground(image, color) {
        document.body.style.backgroundImage = image;
        document.body.style.backgroundColor = color;
    }


    let currentScreenId = activeScreenElement.id;
    
    function goTitle() { 
        stopSoundtrack();
        toggleScreen(currentScreenId, 'title-screen');
        updateBackground("url('https://raw.githubusercontent.com/archiedgegs/O-Legado-do-Ferreiro/main/Backgrounds/Title%20Screen%20Background.png')");
    }
    
    function goMainMenu() { 
        startSoundtrack('main-menu-soundtrack'); 
        toggleScreen(currentScreenId, 'main-menu-screen');
    }    
        
    function goLoadGame() { 
        toggleScreen(currentScreenId, 'loadgame-screen');
    }

    function goOptions() { 
        toggleScreen(currentScreenId, 'options-screen');
    }

    function goAudioOptions() { 
        toggleScreen(currentScreenId, 'options-audio-screen');
    }

    function goControlsOptions() { 
        toggleScreen(currentScreenId, 'options-controls-screen');
    }

    function goGame() {
        startSoundtrack('tavern-theme-soundtrack');
        toggleScreen(currentScreenId, 'game-screen-1');
        updateBackground("none", "#000000");
    }

    function goEnd() { 
        toggleScreen(currentScreenId, 'end-screen');
    }
    


    titleButtonElement.addEventListener('click', () => 
    {
    
    // A função correta é goMainMenu, porém é alterada para facilitar o processo de criação
    
        goGame();
    });



    playButtonElement.addEventListener('click', () => 
    {
        goLoadGame();
    });
    optionsButtonElement.addEventListener('click', () => 
    {
        goOptions();
    });
    exitButtonElement.addEventListener('click', () => 
    {
        goTitle();
    });



    optionsAudioButtonElement.addEventListener('click', () => 
    {
        goAudioOptions();
    });

    optionsControlsButtonElement.addEventListener('click', () => 
    {
        goControlsOptions();
    });

    backFromAudioOptionsButtonElement.addEventListener('click', () => 
    {
        goOptions();
    });

    backFromControlsOptionsButtonElement.addEventListener('click', () => 
    {
        goOptions();
    });



    newGameButtonElement.addEventListener('click', () => 
    {
        showElement('continue-button');
        goGame();
    });
    continueGameButtonElement.addEventListener('click', () => 
    {
        goTitle();
    });



    backFromLoadGameButtonElement.addEventListener('click', () => 
    {
        goMainMenu();
    });
    backFromOptionsButtonElement.addEventListener('click', () => 
    {
        goMainMenu();
    });



    nextButtonElement.addEventListener('click', () => 
    {
        goEnd();
    });

    endButtonElement.addEventListener('click', () => 
    {
        goTitle();
    });



// Soundtracks e configurações de som    

    function increaseSliderValue(slider) {
        const step = parseFloat(slider.step) || 1;
        const newValue = parseFloat(slider.value) + step;
        slider.value = newValue > parseFloat(slider.max) ? slider.max : newValue;
    }

    function decreaseSliderValue(slider) {
        const step = parseFloat(slider.step) || 1;
        const newValue = parseFloat(slider.value) - step;
        slider.value = newValue < parseFloat(slider.min) ? slider.min : newValue;
    }



    const soundtracks = [
        {
            id: 'main-menu-soundtrack',
            element: document.getElementById('main-menu-soundtrack'),
        },
        {
            id: 'tavern-theme-soundtrack',
            element: document.getElementById('tavern-theme-soundtrack'),
        },
    ];

    let currentSoundtrackElement = document.getElementById('main-menu-soundtrack');
    let currentSoundtrackId = currentSoundtrackElement.id;
    musicVolumeSliderElement.value = savedMusicVolume * 100;
    musicVolumeDisplayElement.textContent = musicVolumeSliderElement.value;
    currentSoundtrackElement.volume = musicVolumeSliderElement.value / 100;

    if(!currentSoundtrackElement.paused) {
        currentSoundtrackElement.addEventListener('ended', () => 
        {
            currentSoundtrackElement.currentTime = 0;
        }
        )
    }

    function changeMusic (soundtrackId) {
        let currentSoundtrack = soundtracks.find(soundtrack => soundtrack.id === soundtrackId);
        currentSoundtrackElement = currentSoundtrack.element;
        currentSoundtrackElement.volume = musicVolumeSliderElement.value / 100;
        currentSoundtrackId = soundtrackId;
    };

    function startSoundtrack (newSoundtrackId) {
        if(newSoundtrackId !== currentSoundtrackId) {
            currentSoundtrackElement.pause();
            currentSoundtrackElement.currentTime = 0;
            changeMusic(newSoundtrackId);
            currentSoundtrackElement.play();
        }
        else {
            currentSoundtrackElement.play();
        }
    }
    
    function stopSoundtrack () {    
        currentSoundtrackElement.pause();
        currentSoundtrackElement.currentTime = 0;
    }
    
    musicVolumeSliderElement.addEventListener('input', () => 
    {
    const volume = musicVolumeSliderElement.value / 100;
    currentSoundtrackElement.volume = volume;
    musicVolumeDisplayElement.textContent = musicVolumeSliderElement.value
    localStorage.setItem('savedMusicVolume', JSON.stringify(volume));
    });

    musicVolumeSliderElement.addEventListener('click', () => 
    {
    const volume = musicVolumeSliderElement.value / 100;
    currentSoundtrackElement.volume = volume;
    musicVolumeDisplayElement.textContent = musicVolumeSliderElement.value
    localStorage.setItem('savedMusicVolume', JSON.stringify(volume));
    });
    
    

    const sfxs = [
        {
            id: 'buttonPress-sfx',
            element: document.getElementById('buttonPress-sfx'),
        },
        {
            id: 'swordHit0-sfx',
            element: document.getElementById('swordHit0-sfx'),
        },
        {
            id: 'swordHit2-sfx',
            element: document.getElementById('swordHit2-sfx'),
        },
        {
            id: 'swordHit4-sfx',
            element: document.getElementById('swordHit4-sfx'),
        },
        {
            id: 'swordHit6-sfx',
            element: document.getElementById('swordHit6-sfx'),
        },
        {
            id: 'swordHit8-sfx',
            element: document.getElementById('swordHit8-sfx'),
        },
        {
            id: 'swordHit10-sfx',
            element: document.getElementById('swordHit10-sfx'),
        },
    ];

    let currentSfxElement = document.getElementById('buttonPress-sfx');
    sfxVolumeSliderElement.value = savedSfxVolume * 100;
    sfxVolumeDisplayElement.textContent = sfxVolumeSliderElement.value;
    currentSfxElement.volume = sfxVolumeSliderElement.value / 100;

    function changeSfx (sfxId) {
        let currentSfx = sfxs.find(sfx => sfx.id === sfxId);
        currentSfxElement = currentSfx.element;
        currentSfxElement.volume = sfxVolumeSliderElement.value / 100;
    };

    const buttonSoundElements = document.querySelectorAll('.button-sound');

    buttonSoundElements.forEach(button => {
        button.addEventListener('click', () => {   
        currentSfxElement.pause();
        currentSfxElement.currentTime = 0;
        changeSfx('buttonPress-sfx');
        currentSfxElement.play();
        });
    });

    sfxVolumeSliderElement.addEventListener('input', () => 
    {
    const volume = sfxVolumeSliderElement.value / 100;
    currentSfxElement.volume = volume;
    sfxVolumeDisplayElement.textContent = sfxVolumeSliderElement.value;
    localStorage.setItem('savedSfxVolume', JSON.stringify(volume));
    });

    sfxVolumeSliderElement.addEventListener('click', () => 
    {
    const volume = sfxVolumeSliderElement.value / 100;
    currentSfxElement.volume = volume;
    sfxVolumeDisplayElement.textContent = sfxVolumeSliderElement.value;
    localStorage.setItem('savedSfxVolume', JSON.stringify(volume));
    });



// Controles

    function waitForUserInput() {
        return new Promise((resolve) => {
            function handleKeyPress(event) {
                document.removeEventListener('keydown', handleKeyPress);
                resolve(event.key);
            }
            document.addEventListener('keydown', handleKeyPress);
        });
    }



    let moveUpKey = savedMoveUpKey !== null ? savedMoveUpKey : 'w';
    changeMoveUpKeyButtonElement.textContent = `↑ / ${moveUpKey}`;
    
    let moveDownKey = savedMoveDownKey !== null ? savedMoveDownKey : 's';
    changeMoveDownKeyButtonElement.textContent = `↓ / ${moveDownKey}`;
    
    let moveLeftKey = savedMoveLeftKey !== null ? savedMoveLeftKey : 'a';
    changeMoveLeftKeyButtonElement.textContent = `← / ${moveLeftKey}`;
    
    let moveRightKey = savedMoveRightKey !== null ? savedMoveRightKey : 'd';
    changeMoveRightKeyButtonElement.textContent = `→ / ${moveRightKey}`;

    let selectKey = savedSelectKey !== null ? savedSelectKey : ' ';
    changeSelectKeyButtonElement.textContent = `Enter / ${savedSelectKey !== ' ' ? savedSelectKey : 'Barra de Espaço'}`;

    let backKey = savedBackKey !== null ? savedBackKey : 'Escape';
    changeBackKeyButtonElement.textContent = `Backspace / ${backKey}`;

    

    changeMoveUpKeyButtonElement.addEventListener('click', async() => {
        moveUpKey = await waitForUserInput();
        changeMoveUpKeyButtonElement.textContent = `↑ / ${moveUpKey}`;
        localStorage.setItem('savedMoveUpKey', JSON.stringify(moveUpKey));
    });

    changeMoveDownKeyButtonElement.addEventListener('click', async() => {
        moveDownKey = await waitForUserInput();
        changeMoveDownKeyButtonElement.textContent = `↓ / ${moveDownKey}`;
        localStorage.setItem('savedMoveDownKey', JSON.stringify(moveDownKey));
    });

    changeMoveLeftKeyButtonElement.addEventListener('click', async() => {
        moveLeftKey = await waitForUserInput();
        changeMoveLeftKeyButtonElement.textContent = `← / ${moveLeftKey}`;
        localStorage.setItem('savedMoveLeftKey', JSON.stringify(moveLeftKey));
    });

    changeMoveRightKeyButtonElement.addEventListener('click', async() => {
        moveRightKey = await waitForUserInput();
        changeMoveRightKeyButtonElement.textContent = `→ / ${moveRightKey}`;
        localStorage.setItem('savedMoveRightKey', JSON.stringify(moveRightKey));
    });

    changeSelectKeyButtonElement.addEventListener('click', async() => {
        selectKey = await waitForUserInput();
        changeSelectKeyButtonElement.textContent = `Enter / ${selectKey}`;
        localStorage.setItem('savedSelectKey', JSON.stringify(selectKey));
    });

    changeBackKeyButtonElement.addEventListener('click', async() => {
        backKey = await waitForUserInput();
        changeBackKeyButtonElement.textContent = `Backspace / ${backKey}`;
        localStorage.setItem('savedBackKey', JSON.stringify(backKey));
    });



    document.addEventListener('keydown', (event) => 
    {
        switch (event.key) {
            case 'ArrowUp':
            case moveUpKey:
                event.preventDefault();
                hoveredButtonIndex = (hoveredButtonIndex - 1 + onScreenNavigableButtonElements.length) % onScreenNavigableButtonElements.length;
                break;

            case 'ArrowDown':
            case moveDownKey:
                event.preventDefault();
                hoveredButtonIndex = (hoveredButtonIndex + 1) % onScreenNavigableButtonElements.length;
                break;

            case 'ArrowLeft':
            case moveLeftKey:
                event.preventDefault();
                if(onScreenNavigableButtonElements[hoveredButtonIndex] === musicVolumeSliderElement) {
                    decreaseSliderValue(onScreenNavigableButtonElements[hoveredButtonIndex]);
                    musicVolumeSliderElement.click();
                }
                if(onScreenNavigableButtonElements[hoveredButtonIndex] === sfxVolumeSliderElement) {
                    decreaseSliderValue(onScreenNavigableButtonElements[hoveredButtonIndex]);
                    sfxVolumeSliderElement.click();
                }
                break;

            case 'ArrowRight':
            case moveRightKey:
                event.preventDefault();
                if(onScreenNavigableButtonElements[hoveredButtonIndex] === musicVolumeSliderElement) {
                    increaseSliderValue(onScreenNavigableButtonElements[hoveredButtonIndex]);
                    musicVolumeSliderElement.click();
                }
                if(onScreenNavigableButtonElements[hoveredButtonIndex] === sfxVolumeSliderElement) {
                    increaseSliderValue(onScreenNavigableButtonElements[hoveredButtonIndex]);
                    sfxVolumeSliderElement.click();
                }
                break;

            case 'Enter':
            case selectKey:
                event.preventDefault();
                onScreenNavigableButtonElements[hoveredButtonIndex].click();
                break;

            case 'Backspace':
            case backKey:
                event.preventDefault();
                let backButtonElementIndex = Array.from(onScreenNavigableButtonElements).findIndex((element) => 
                {
                return element.classList.contains('back')
                });
                if(backButtonElementIndex !== -1) {
                onScreenNavigableButtonElements[backButtonElementIndex].click();
                }
                break;

            default:
                break;
        }

        onScreenNavigableButtonElements.forEach((button, index) => {
            if (index === hoveredButtonIndex) {
                button.classList.add('hovered');
                button.focus();
            } else {
                button.classList.remove('hovered');
            }
        });
    });



// Save States

if (localStorage) {
    console.log(`
    Observação:
    
        localStorage é suportado pelo seu Browser, seu progresso será salvo!
    `);

/*
O formato para criar um item no armazenamento local é:
localStorage.setItem('chave (pode ser qualquer nome que quiser)', JSON.stringify(valor que se deseja armazenar));

Para usar esse item deve-se usar uma variável nova e inicializá-la com o valor igual a:
JSON.parse(localStorage.getItem('chave'))

Obs: JSON.stringify transforma um valor em string e JSON.parse transforma uma string em um valor de volta ao original
*/
    console.log(`
    Os controles atuais são:
        
        Mover para Cima: ${savedMoveUpKey}
        
        Mover para Baixo: ${savedMoveDownKey}
        
        Mover para Esquerda: ${savedMoveLeftKey}
        
        Mover para Direita: ${savedMoveRightKey}
        
        Selecionar: ${savedSelectKey !== ' ' ? savedSelectKey : 'Barra de Espaço'}
        
        Voltar: ${savedBackKey}
    `)

    console.log(`
    Os volumes atuais são:

        Música: ${savedMusicVolume * 100}

        Efeitos Sonoros: ${savedSfxVolume * 100}
    `)
}
else {
    console.log('Erro: localStorage NÃO é suportado pelo seu Browser, recarregar a página reiniciará seu progresso');
    showElement('localStorage-compatibility-text');
}