Sub stock_market():

Dim Ticker As String
Dim Total_Stock_Volume As Double
Dim Yearly_Change As Double
Dim Percent_Change As Double
Dim Summary_Table_Row As Integer
Dim Opening, Closing As Double
Dim Greatest_Percent_Increase As Double
Dim Greatest_Percent_Decrease As Double
Dim Greatest_Total_Volume As Double

For Each ws In Worksheets
    
    Summary_Table_Row = 2
    
    Total_Stock_Volume = 0

    
    LastRow = ws.Cells(Rows.Count, 1).End(xlUp).Row

    Opening = ws.Cells(2, 3)
    For i = 2 To LastRow
    
        
        If ws.Cells(i + 1, 1) <> ws.Cells(i, 1) Then
            Ticker = ws.Cells(i, 1)
            Total_Stock_Volume = Total_Stock_Volume + ws.Cells(i, 7)
        
            Closing = ws.Cells(i, 6)
           
            Yearly_Change = Closing - Opening
            
            
            If Opening = 0 Then
                Percent_Change = 0
            Else
                Percent_Change = Yearly_Change / Opening * 100
           End If
            
            ws.Range("I" & Summary_Table_Row).Value = Ticker
            ws.Range("J" & Summary_Table_Row).Value = Yearly_Change
            ws.Range("K" & Summary_Table_Row).Value = (Percent_Change & "%")
            ws.Range("L" & Summary_Table_Row).Value = Total_Stock_Volume
            
             
            Total_Stock_Volume = 0
       
            Opening = ws.Cells(i + 1, 3)
            
            
             If ws.Range("J" & Summary_Table_Row).Value >= 0 Then
                ws.Range("J" & Summary_Table_Row).Interior.ColorIndex = 4
            
            Else
            
                ws.Range("J" & Summary_Table_Row).Interior.ColorIndex = 3
            
    ws.Range("Q1") = "Value"
    ws.Range("O2") = "Greatest % Increase"
    ws.Range("O3") = "Greatest % Decrease"
    ws.Range("O4") = "Greatest Total Volume"

                End If
            
                Summary_Table_Row = Summary_Table_Row + 1
        Else
            Total_Stock_Volume = Total_Stock_Volume + ws.Cells(i, 7)
           
        End If
                
    Next i
    
    ws.Range("I1") = "Ticker"
    ws.Range("P1") = "Ticker "
    ws.Range("J1") = "Yearly Change"
    ws.Range("K1") = "Percent. Change"
    ws.Range("L1") = "Total Stock Vol ume"
Next ws

  
End Sub

Sub stock_market2():


Dim max1, max2, min1 As Double
Dim rng1 As Range
Dim rng As Range
Dim FndRng As Range
Dim i, LastRow As Integer
Dim ticker_min, ticker_max, ticker_total As String


For Each ws In Worksheets
    
    Set rng = ws.Columns(11)
    max1 = ws.Application.Max(rng)
    ws.Range("Q2") = max1
    
    min1 = ws.Application.Min(rng)
    ws.Range("Q3") = min1
    
    Set rng1 = ws.Columns(12)
    max2 = ws.Application.Max(rng1)
    ws.Range("Q4") = max2
    
    
    LastRow = ws.Cells(Rows.Count, 11).End(xlUp).Row
    For i = 2 To LastRow
        If ws.Cells(i, 11) = min1 Then
            ticker_min = ws.Cells(i, 9)
        End If
        
    
        If ws.Cells(i, 11) = max1 Then
            ticker_max = ws.Cells(i, 9)
            
        End If
            
        If ws.Cells(i, 12) = max2 Then
            ticker_total = ws.Cells(i, 9)
            
        End If
            
    Next i
    
    ws.Range("P3") = ticker_min
    ws.Range("P2") = ticker_max
    ws.Range("P4") = ticker_max

    
  
Next ws

End Sub