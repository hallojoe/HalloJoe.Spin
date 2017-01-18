
Namespace HalloJoe.Spin.Vb

    Public Class TextSpinner

        Private _part As ITextPart
        Private _rnd As Random

        Private Shared Function ParsePart(ByVal text As String,
                                          ByVal startIdx As Integer,
                                          ByVal endIdx As Integer,
                                          ByVal rnd As Random
                                          ) As ITextPart

            Dim at As New AlternatedText(rnd)
            Dim ct As New ConcatenetedText()
            Dim part As String = Nothing ' part of text

            Dim balance As Integer = 0 ' amount of unmatched opening brackets

            Dim i As Integer
            Dim opnIdx As Integer = -1 ' position of the opening bracket
            For i = startIdx To endIdx - 1
                If text(i) = "{"c Then ' opening
                    If balance = 0 Then
                        part = text.Substring(startIdx, i - startIdx)
                        If Not String.IsNullOrEmpty(part) Then ' add to concatenation
                            ct.Add(New SimpleText(part))
                        End If
                        startIdx = i + 1 ' update starting index
                        opnIdx = i       ' remember position of the opening bracket
                    End If
                    balance += 1
                ElseIf text(i) = "|"c AndAlso balance = 0 Then
                    part = text.Substring(startIdx, i - startIdx)
                    ct.Add(New SimpleText(part)) ' no check for empty string - by design
                    at.Add(ct) ' add to alternatives
                    ct = New ConcatenetedText()
                    startIdx = i + 1
                ElseIf text(i) = "}"c Then
                    balance -= 1
                    If balance = 0 Then
                        Dim innerPart As ITextPart = ParsePart(text, opnIdx + 1, i, rnd) ' recursively
                        ct.Add(innerPart)
                        opnIdx = -1 ' just for a case, not really needed
                        startIdx = i + 1
                    ElseIf balance < 0 Then ' parsing check
                        Throw New ArgumentException(String.Format("Unexpected '}}' at position {0}", i))
                    End If
                End If
            Next

            If balance > 0 Then ' unmatched ?
                Throw New ArgumentException(String.Format("'{{' at position {0} is unmatched", opnIdx))
            End If

            part = text.Substring(startIdx, i - startIdx) ' last part
            If Not String.IsNullOrEmpty(part) Then
                ct.Add(New SimpleText(part))
            End If

            If at.Count = 0 Then ' were there alternatives ?
                Return ct
            Else
                at.Add(ct)
                Return at
            End If
        End Function

        Public Sub New(ByVal text As String)
            _rnd = New Random()
            _part = ParsePart(text, 0, text.Length, _rnd)
        End Sub

        Public Sub New(ByVal text As String, ByVal rnd As Random)
            _rnd = rnd
            _part = ParsePart(text, 0, text.Length, _rnd)
        End Sub

        Public Overrides Function ToString() As String
            Return _part.ToString()
        End Function

        Public Function ToStructuredString() As String
            Return _part.ToStructuredString()
        End Function

        'Public ReadOnly Property Variants() As Decimal
        '    Get
        '        Return CountVariants()
        '    End Get
        'End Property

        'Public ReadOnly Property MinWords() As Decimal
        '    Get
        '        Return CountMinWords()
        '    End Get
        'End Property

        'Public ReadOnly Property MaxWords() As Decimal
        '    Get
        '        Return CountMaxWords()
        '    End Get
        'End Property

        Public Function CountVariants() As Decimal
            Return _part.CountVariants
        End Function

        Public Function CountMinWords() As Integer
            Return _part.CountMinWords
        End Function

        Public Function CountMaxWords() As Integer
            Return _part.CountMaxWords
        End Function

        Public Shared Function Spin(ByVal text As String) As String ' convenient for single calls
            Return New TextSpinner(text).ToString()
        End Function

        Public Shared Function Spin(ByVal text As String, ByVal rnd As Random) As String ' convenient for single calls
            Return New TextSpinner(text, rnd).ToString()
        End Function

    End Class

End Namespace