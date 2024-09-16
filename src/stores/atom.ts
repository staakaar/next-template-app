import { atom, atomFamily, selector } from 'recoil';

/** オブジェクトのセットも可能 */
export const counterAtom = atom({
    key: 'counterAtom',
    default: 0
});

export type Contract = {
    contractCode: string
}

const defaultContract: Contract = {
    contractCode: "0001"
}

export const contractAtom = atom({
    key: 'contractAtom',
    default: defaultContract
})

/** 参照方法 */
// export default function RecoilCounter() {
//     const [counter, setCounter] = useRecoilState(counterAtom);

//     const handleClick = () => {
//         setCounter(c => c + 1);
//     };

//     return (
//         <>
//             <button onClick={handleClick}>カウント</button>
//             <p>{counter}回、クリックされました。</p>
//         </>
//     );
// }

// export const todoAtom = atom({
//     key: 'todosAtom',
//     default: [
//         {
//             id: 1,
//             title: '',
//             isDone: false
//         },
//     ],
// });

// export const todoLastIdSelector = selector({
//     key: 'todoLastIdSelector',
//     get: ({get}) => {
//         const todo = get(todoAtom);
//         return todo.at(-1)?.id ?? 0;
//     },
// });

// 以下 atomUp.jsの記載

export const idsAtom = atom({
    key: 'idsAtom',
    default: []
});

export const todoAtom = atomFamily({
    key: 'todoAtom',
    default: null
});

export const todoListSelector = selector({
    key: 'todoListSelector',
    get: ({ get }) => {
        const ids = get(idsAtom);
        return ids.map(id => get(todoAtom(id)));
    },
    set: ({ set, reset }, { type, id, newItem }: any) => {
        switch (type) {
            case 'add':
                set(todoAtom(newItem.id), newItem);
                set(idsAtom, ids => [...ids, newItem.id] as any);
                break;
            case 'done':
                set(todoAtom(id), todo => ({ ...todo, isDone: true }));
                break;
            case 'remove':
                reset(todoAtom(id));
                set(idsAtom, ids => ids.filter(e => e !== id));
                break;
            default:
                throw new Error('Type is invalid.');
        }
    }
})