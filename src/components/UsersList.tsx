import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  fullName: string;
  birthDate: string;
  fsrId: string;
  institution: string;
  coach: string;
  email: string;
  phone: string;
  rating: number;
  status: 'active' | 'inactive';
  registrationDate: string;
}

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Демо данные пользователей
  const [users] = useState<User[]>([
    {
      id: '1',
      fullName: 'Иванов Алексей Петрович',
      birthDate: '2012-05-15',
      fsrId: '123456',
      institution: 'МБОУ СОШ №12',
      coach: 'Петров Сергей Иванович',
      email: 'ivanov@email.com',
      phone: '+7 (495) 123-45-67',
      rating: 1350,
      status: 'active',
      registrationDate: '2024-01-15'
    },
    {
      id: '2',
      fullName: 'Петрова Мария Александровна',
      birthDate: '2013-08-22',
      fsrId: '234567',
      institution: 'Гимназия №5',
      coach: 'Сидорова Елена Владимировна',
      email: 'petrova@email.com',
      phone: '+7 (495) 234-56-78',
      rating: 1285,
      status: 'active',
      registrationDate: '2024-02-10'
    },
    {
      id: '3',
      fullName: 'Сидоров Михаил Дмитриевич',
      birthDate: '2011-12-03',
      fsrId: '345678',
      institution: 'Лицей №3',
      coach: 'Кузнецов Андрей Николаевич',
      email: 'sidorov@email.com',
      phone: '+7 (495) 345-67-89',
      rating: 1420,
      status: 'inactive',
      registrationDate: '2023-11-20'
    },
    {
      id: '4',
      fullName: 'Козлова Анна Сергеевна',
      birthDate: '2014-03-18',
      fsrId: '456789',
      institution: 'МБОУ СОШ №7',
      coach: 'Морозов Павел Викторович',
      email: 'kozlova@email.com',
      phone: '+7 (495) 456-78-90',
      rating: 1180,
      status: 'active',
      registrationDate: '2024-03-05'
    },
    {
      id: '5',
      fullName: 'Волков Денис Андреевич',
      birthDate: '2012-09-12',
      fsrId: '567890',
      institution: 'Школа-интернат №15',
      coach: 'Федоров Игорь Александрович',
      email: 'volkov@email.com',
      phone: '+7 (495) 567-89-01',
      rating: 1320,
      status: 'active',
      registrationDate: '2024-01-28'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fsrId.includes(searchTerm) ||
                         user.institution.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Список участников</h1>
        <p className="text-lg text-muted-foreground">Зарегистрированные игроки центра "Мир шахмат"</p>
      </div>

      {/* Фильтры и поиск */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Поиск по имени, ID ФШР или учреждению..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            Все
          </Button>
          <Button
            variant={filterStatus === 'active' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('active')}
            size="sm"
          >
            Активные
          </Button>
          <Button
            variant={filterStatus === 'inactive' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('inactive')}
            size="sm"
          >
            Неактивные
          </Button>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Icon name="Users" size={24} className="text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Всего участников</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Icon name="UserCheck" size={24} className="text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Активных</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Icon name="TrendingUp" size={24} className="text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{Math.round(users.reduce((acc, u) => acc + u.rating, 0) / users.length)}</p>
                <p className="text-sm text-muted-foreground">Средний рейтинг</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Icon name="Calendar" size={24} className="text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => new Date(u.registrationDate) > new Date('2024-01-01')).length}</p>
                <p className="text-sm text-muted-foreground">Новых в 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Список пользователей */}
      <div className="grid gap-4">
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Участники не найдены</p>
              <p className="text-sm text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{user.fullName}</CardTitle>
                    <CardDescription>
                      {calculateAge(user.birthDate)} лет • ID ФШР: {user.fsrId}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                    <Badge variant="outline">
                      Рейтинг: {user.rating}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Icon name="School" size={16} className="mr-2 text-muted-foreground" />
                      <span>{user.institution}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Icon name="UserCheck" size={16} className="mr-2 text-muted-foreground" />
                      <span>Тренер: {user.coach}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Icon name="Calendar" size={16} className="mr-2 text-muted-foreground" />
                      <span>Регистрация: {new Date(user.registrationDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Icon name="Mail" size={16} className="mr-2 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Icon name="Phone" size={16} className="mr-2 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Icon name="Cake" size={16} className="mr-2 text-muted-foreground" />
                      <span>{new Date(user.birthDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Подробнее
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Trophy" size={16} className="mr-2" />
                    Результаты
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersList;