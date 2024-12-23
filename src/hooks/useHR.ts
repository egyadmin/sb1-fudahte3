import { useState, useEffect } from 'react';
import { hrApi } from '../lib/supabase/hr';
import { useToast } from './useToast';

export const useHR = () => {
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [recruitment, setRecruitment] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        departmentsData,
        positionsData,
        employeesData,
        recruitmentData,
        policiesData
      ] = await Promise.all([
        hrApi.getDepartments(),
        hrApi.getPositions(),
        hrApi.getEmployees(),
        hrApi.getRecruitment(),
        hrApi.getPolicies()
      ]);

      setDepartments(departmentsData.data || []);
      setPositions(positionsData.data || []);
      setEmployees(employeesData.data || []);
      setRecruitment(recruitmentData.data || []);
      setPolicies(policiesData.data || []);
    } catch (error) {
      showToast('Error loading HR data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addDepartment = async (data: any) => {
    try {
      const result = await hrApi.addDepartment(data);
      if (result.data) {
        setDepartments(prev => [result.data, ...prev]);
        showToast('Department added successfully', 'success');
      }
    } catch (error) {
      showToast('Error adding department', 'error');
    }
  };

  const addPosition = async (data: any) => {
    try {
      const result = await hrApi.addPosition(data);
      if (result.data) {
        setPositions(prev => [result.data, ...prev]);
        showToast('Position added successfully', 'success');
      }
    } catch (error) {
      showToast('Error adding position', 'error');
    }
  };

  const addEmployee = async (data: any) => {
    try {
      const result = await hrApi.addEmployee(data);
      if (result.data) {
        setEmployees(prev => [result.data, ...prev]);
        showToast('Employee added successfully', 'success');
      }
    } catch (error) {
      showToast('Error adding employee', 'error');
    }
  };

  const addRecruitment = async (data: any) => {
    try {
      const result = await hrApi.addRecruitment(data);
      if (result.data) {
        setRecruitment(prev => [result.data, ...prev]);
        showToast('Recruitment position added successfully', 'success');
      }
    } catch (error) {
      showToast('Error adding recruitment position', 'error');
    }
  };

  const addPolicy = async (data: any) => {
    try {
      const result = await hrApi.addPolicy(data);
      if (result.data) {
        setPolicies(prev => [result.data, ...prev]);
        showToast('Policy added successfully', 'success');
      }
    } catch (error) {
      showToast('Error adding policy', 'error');
    }
  };

  return {
    departments,
    positions,
    employees,
    recruitment,
    policies,
    loading,
    addDepartment,
    addPosition,
    addEmployee,
    addRecruitment,
    addPolicy,
    refresh: loadData
  };
};