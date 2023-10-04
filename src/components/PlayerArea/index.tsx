/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table'

import PokemonCard from '../PokemonCard';
import ActiveArea from '../ActiveArea';
import BenchArea from '../BenchArea';

export interface Status {
    value: string,
    label: string,
    color: string
}

export interface PokemonCardTypes {
    active: boolean;
}

const columns = [
    {
        title: 'Pokemon',
        dataIndex: 'name',
        key: 'name',
        render: () => <PokemonCard />
    },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}

const Row = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        cursor: 'move',
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

export default function PlayerArea() {
    const [pokemon, setPokemon] = useState([
        {
            key: 1,
        },
        {
            key: 2,
        },
        {
            key: 3,
        },
        {
            key: 4,
        },
        {
            key: 5,
        },
        {
            key: 6,
        }
    ]);

    useEffect(() => {
        console.log(pokemon);
    }, [pokemon]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
                distance: 1,
            },
        }),
    );

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setPokemon((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext
                // rowKey array
                items={pokemon.map((i) => i.key)}
                strategy={verticalListSortingStrategy}
            >
                <Table
                    components={{
                        body: {
                            row: Row,
                        },
                    }}
                    rowKey="key"
                    columns={columns}
                    dataSource={pokemon}
                    pagination={false}
                />
            </SortableContext>
        </DndContext>

    )
}

