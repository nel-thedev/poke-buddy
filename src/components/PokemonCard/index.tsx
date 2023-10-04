/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Cascader, Typography } from 'antd';
import { useState } from 'react';

export interface Status {
  value: string,
  label: string,
  color: string
}

export interface PokemonCardTypes {
  active?: boolean;
}

function PokemonCard({ active }: PokemonCardTypes) {
  const [damage, setDamage] = useState<number>(0);
  const [tempDamage, setTempDamage] = useState<number>(0);
  const [status, setStatus] = useState<[] | undefined>([]);

  const statusOptions: Status[] = [
    {
      label: 'Poisoned',
      value: 'Poisoned',
      color: '#5e158d'
    },
    {
      label: 'Asleep',
      value: 'Asleep',
      color: '#3d85c6'
    },
    {
      label: 'Confused',
      value: 'Confused',
      color: '#e387ff'
    },
    {
      label: 'Paralyzed',
      value: 'Paralyzed',
      color: '#f1c232'
    },
    {
      label: 'Burned',
      value: 'Burned',
      color: '#ff5e5e'
    }
  ]

  const confirmDamage = () => {
    setDamage(damage + tempDamage);
    setTempDamage(0);
  };

  const changeStatus = (value) => {
    setStatus(value);
  }


  return (
    <div >
      {active ? (
        <>
          <Card className='activePkmn'>
            {
              status.map((item, index) => {
                return <Typography.Text style={{ color: statusOptions.find((status) => status.value == item[0])?.color }} key={index}>{item}{index < status.length - 1 ? ' & ' : ''}</Typography.Text>
              })
            }
            <Typography.Title level={2}>{damage}</Typography.Title>

            <div>
              {tempDamage !== 0 ? (
                <>
                  <Typography.Title
                    level={5}
                    style={
                      tempDamage > 0 ? { color: 'red' } : { color: 'green' }
                    }
                  >
                    {tempDamage}
                  </Typography.Title>
                </>
              ) : (
                <></>
              )}
              <div>
                <Cascader
                  options={statusOptions}
                  onChange={changeStatus}
                  placeholder="Status"
                  multiple
                  suffixIcon={<></>}
                  style={{ width: '80px' }}
                  maxTagCount={0}
                  maxTagPlaceholder="Status"
                  allowClear={false}
                />
                <Button
                  type={'default'}
                  onClick={() => setTempDamage(tempDamage - 10)}
                >
                  <MinusOutlined />
                </Button>
                <Button
                  type={'default'}
                  onClick={() => setTempDamage(tempDamage + 10)}
                >
                  <PlusOutlined />
                </Button>
                <Button type={'primary'} onClick={confirmDamage}>
                  <CheckOutlined />
                </Button>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <>
          <Card className='benchPkmn'>
            {
              status.map((item, index) => {
                return <Typography.Text style={{ color: statusOptions.find((status) => status.value == item[0])?.color }} key={index}>{item}{index < status.length - 1 ? ' & ' : ''}</Typography.Text>
              })
            }
            <Typography.Title level={2}>{damage}</Typography.Title>

            <div>
              {tempDamage !== 0 ? (
                <>
                  <Typography.Title
                    level={5}
                    style={
                      tempDamage > 0 ? { color: 'red' } : { color: 'green' }
                    }
                  >
                    {tempDamage}
                  </Typography.Title>
                </>
              ) : (
                <></>
              )}
              <div>
                <Button
                  type={'default'}
                  onClick={() => setTempDamage(tempDamage - 10)}
                >
                  <MinusOutlined />
                </Button>
                <Button
                  type={'default'}
                  onClick={() => setTempDamage(tempDamage + 10)}
                >
                  <PlusOutlined />
                </Button>
                <Button type={'primary'} onClick={confirmDamage}>
                  <CheckOutlined />
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

export default PokemonCard;
