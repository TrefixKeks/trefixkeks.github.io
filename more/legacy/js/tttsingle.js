window.addEventListener("DOMContentLoaded", () => {

    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player")
    const resetButton = document.querySelector("#reset")
    const announcer = document.querySelector(".announcer")

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';
    
    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Spieler <span class="playerO">O</span> hat gewonnen!';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Spieler <span class="playerX">X</span> hat gewonnen!';
                break;
            case TIE:
                announcer.innerText = 'Unentschieden';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });


    resetButton.addEventListener("click", resetBoard)

    const getBestMove = () => {
        // Check if the bot can win in the next move
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === 'O' && board[b] === 'O' && !board[c]) {
                return c;
            }
            if (board[a] === 'O' && board[c] === 'O' && !board[b]) {
                return b;
            }
            if (board[b] === 'O' && board[c] === 'O' && !board[a]) {
                return a;
            }
        }

        // Check if the player can win in the next move and block it
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === 'X' && board[b] === 'X' && !board[c]) {
                return c;
            }
            if (board[a] === 'X' && board[c] === 'X' && !board[b]) {
                return b;
            }
            if (board[b] === 'X' && board[c] === 'X' && !board[a]) {
                return a;
            }
        }

        // If no winning or blocking moves, choose a random empty cell
        const emptyIndexes = board.reduce((acc, curr, index) => {
            if (!curr) acc.push(index);
            return acc;
        }, []);
    
        const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
        return emptyIndexes[randomIndex];
    };
    
    const botAction = () => {
        if (!isGameActive) return;
    
        const index = getBestMove();
        const tile = tiles[index];
    
        userAction(tile, index);
    };
    
    setInterval(() => {
        if (currentPlayer === 'O') {
            botAction();
        }
    }, 500);
    
})

/**
 * const getRandomEmptyIndex = () => {
        const emptyIndexes = board.reduce((acc, curr, index) => {
            if (!curr) acc.push(index);
            return acc;
        }, []);
    
        const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
        return emptyIndexes[randomIndex];
    };
    
    const botAction = () => {
        if (!isGameActive) return;
    
        const index = getRandomEmptyIndex();
        const tile = tiles[index];
    
        userAction(tile, index);
    };
    
    setInterval(() => {
        if (currentPlayer === 'O') {
            botAction();
        }
    }, 500);
 */







