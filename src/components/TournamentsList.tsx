import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from '@/components/ui/icon';

interface Tournament {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  category: string;
  ageGroup: string;
  prize: string;
  status: 'registration' | 'upcoming' | 'ongoing' | 'completed';
  participants: number;
  maxParticipants: number;
  location: string;
  entryFee: number;
  organizer: string;
  description: string;
}

const TournamentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Демо данные турниров
  const [tournaments] = useState<Tournament[]>([
    {
      id: '1',
      title: 'Открытый турнир "Дебют"',
      date: '2025-02-15',
      category: 'Классические шахматы',
      ageGroup: 'До 10 лет',
      prize: 'Кубки и медали',
      status: 'registration',
      participants: 24,
      maxParticipants: 40,
      location: 'Центр "Мир шахмат"',
      entryFee: 500,
      organizer: 'Петров С.И.',
      description: 'Турнир для начинающих шахматистов до 10 лет. Система швейцарская, 7 туров.'
    },
    {
      id: '2',
      title: 'Первенство города',
      date: '2025-03-02',
      endDate: '2025-03-03',
      category: 'Классические шахматы',
      ageGroup: 'До 12 лет',
      prize: 'Денежные призы',
      status: 'upcoming',
      participants: 35,
      maxParticipants: 50,
      location: 'Дворец спорта',
      entryFee: 1000,
      organizer: 'Сидорова Е.В.',
      description: 'Городское первенство среди юношей и девушек до 12 лет. Круговая система.'
    },
    {
      id: '3',
      title: 'Шахматный фестиваль',
      date: '2025-04-20',
      endDate: '2025-04-22',
      category: 'Блиц',
      ageGroup: 'Все возрасты',
      prize: 'Дипломы и призы',
      status: 'upcoming',
      participants: 0,
      maxParticipants: 100,
      location: 'Культурный центр',
      entryFee: 300,
      organizer: 'Морозов П.В.',
      description: 'Большой семейный фестиваль с турнирами для всех возрастов. Блиц и быстрые шахматы.'
    },
    {
      id: '4',
      title: 'Кубок зимы 2024',
      date: '2024-12-15',
      endDate: '2024-12-16',
      category: 'Быстрые шахматы',
      ageGroup: 'До 14 лет',
      prize: 'Кубки, медали',
      status: 'completed',
      participants: 42,
      maxParticipants: 45,
      location: 'Центр "Мир шахмат"',
      entryFee: 800,
      organizer: 'Кузнецов А.Н.',
      description: 'Итоговый турнир года среди юных шахматистов.'
    },
    {
      id: '5',
      title: 'Турнир памяти Карпова',
      date: '2025-01-25',
      category: 'Классические шахматы',
      ageGroup: 'До 16 лет',
      prize: 'Денежные призы',
      status: 'ongoing',
      participants: 28,
      maxParticipants: 30,
      location: 'Шахматный клуб',
      entryFee: 1200,
      organizer: 'Федоров И.А.',
      description: 'Престижный турнир памяти великого чемпиона мира.'
    }
  ]);

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || tournament.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || tournament.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'registration':
        return { label: 'Регистрация открыта', color: 'bg-green-100 text-green-800' };
      case 'upcoming':
        return { label: 'Скоро', color: 'bg-blue-100 text-blue-800' };
      case 'ongoing':
        return { label: 'Идёт', color: 'bg-orange-100 text-orange-800' };
      case 'completed':
        return { label: 'Завершён', color: 'bg-gray-100 text-gray-800' };
      default:
        return { label: 'Неизвестно', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const formatDate = (dateStr: string, endDateStr?: string) => {
    const date = new Date(dateStr);
    const formatted = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    if (endDateStr) {
      const endDate = new Date(endDateStr);
      const endFormatted = endDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long'
      });
      return `${formatted} - ${endFormatted}`;
    }
    
    return formatted;
  };

  const categories = Array.from(new Set(tournaments.map(t => t.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Турниры и соревнования</h1>
        <p className="text-lg text-muted-foreground">Расписание и результаты шахматных турниров</p>
      </div>

      {/* Фильтры и поиск */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            placeholder="Поиск турниров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Статус турнира" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="registration">Регистрация открыта</SelectItem>
              <SelectItem value="upcoming">Предстоящие</SelectItem>
              <SelectItem value="ongoing">Текущие</SelectItem>
              <SelectItem value="completed">Завершённые</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Icon name="Calendar" size={24} className="text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{tournaments.length}</p>
                <p className="text-sm text-muted-foreground">Всего турниров</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Icon name="Clock" size={24} className="text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{tournaments.filter(t => t.status === 'registration' || t.status === 'upcoming').length}</p>
                <p className="text-sm text-muted-foreground">Предстоящих</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Icon name="Users" size={24} className="text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{tournaments.reduce((acc, t) => acc + t.participants, 0)}</p>
                <p className="text-sm text-muted-foreground">Участников</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Icon name="Trophy" size={24} className="text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{tournaments.filter(t => t.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Завершено</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Список турниров */}
      <div className="grid gap-6">
        {filteredTournaments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Турниры не найдены</p>
              <p className="text-sm text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </CardContent>
          </Card>
        ) : (
          filteredTournaments.map((tournament) => {
            const statusInfo = getStatusInfo(tournament.status);
            return (
              <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{tournament.title}</CardTitle>
                      <CardDescription className="text-base">
                        {formatDate(tournament.date, tournament.endDate)}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={statusInfo.color}>
                        {statusInfo.label}
                      </Badge>
                      <Badge variant="outline">
                        {tournament.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Icon name="Users" size={16} className="mr-2 text-muted-foreground" />
                        <span>Возраст: {tournament.ageGroup}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Icon name="MapPin" size={16} className="mr-2 text-muted-foreground" />
                        <span>{tournament.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Icon name="User" size={16} className="mr-2 text-muted-foreground" />
                        <span>Организатор: {tournament.organizer}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Icon name="DollarSign" size={16} className="mr-2 text-muted-foreground" />
                        <span>Взнос: {tournament.entryFee} ₽</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Icon name="Trophy" size={16} className="mr-2 text-muted-foreground" />
                        <span>Призы: {tournament.prize}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Icon name="UserCheck" size={16} className="mr-2 text-muted-foreground" />
                        <span>{tournament.participants}/{tournament.maxParticipants} участников</span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 lg:col-span-1">
                      <p className="text-sm text-muted-foreground">{tournament.description}</p>
                    </div>
                  </div>
                  
                  {/* Прогресс-бар заполненности */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Заполненность</span>
                      <span>{Math.round((tournament.participants / tournament.maxParticipants) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {tournament.status === 'registration' && (
                      <Button>
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Зарегистрироваться
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Icon name="Info" size={16} className="mr-2" />
                      Подробнее
                    </Button>
                    
                    {tournament.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Icon name="Trophy" size={16} className="mr-2" />
                        Результаты
                      </Button>
                    )}
                    
                    {(tournament.status === 'ongoing' || tournament.status === 'completed') && (
                      <Button variant="outline" size="sm">
                        <Icon name="BarChart" size={16} className="mr-2" />
                        Таблица
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} className="mr-2" />
                      Положение
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TournamentsList;